import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const RECIPIENT = "nikhilc.achar23@gmail.com";

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  scope: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/public/enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "Email service is not configured" },
            { status: 500 },
          );
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = enquirySchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const { name, phone, email, scope, message } = parsed.data;

        const rows: Array<[string, string]> = [
          ["Name", name],
          ["Phone", phone],
          ["Email", email || "—"],
          ["Scope", scope || "—"],
          ["Message", message || "—"],
        ];
        const html = `
          <div style="font-family:Arial,sans-serif;max-width:600px">
            <h2 style="color:#0b1224">New enquiry from RK Interiors website</h2>
            <table cellpadding="8" style="border-collapse:collapse;width:100%">
              ${rows
                .map(
                  ([k, v]) =>
                    `<tr><td style="background:#f6f5f2;font-weight:600;width:120px">${k}</td><td style="border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(
                      v,
                    )}</td></tr>`,
                )
                .join("")}
            </table>
          </div>
        `;
        const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: "RK Interiors Enquiry <onboarding@resend.dev>",
            to: [RECIPIENT],
            reply_to: email || undefined,
            subject: `New enquiry — ${name}${scope ? ` (${scope})` : ""}`,
            html,
            text,
          }),
        });

        if (!res.ok) {
          const body = await res.text();
          console.error(`Resend failed [${res.status}]: ${body}`);
          return Response.json(
            { error: "Failed to send enquiry" },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});