import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { rkPageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => rkPageHead(
    "/contact",
    "Contact RK Interiors — Book a Consultation in Bengaluru",
    "Talk to Vedu at RK Interiors by phone, WhatsApp or enquiry form for a free interior design or construction consultation in Bengaluru.",
  ),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <header className="navy-surface text-marble">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 lg:px-8 animate-fade-in">
          <p className="eyebrow text-gold-gradient">Get in touch</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl md:text-7xl">
            Tell Vedu about your project — <span className="text-gold-gradient">we'll take it from there.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-marble/80 md:text-lg">
            Free 30-minute discovery call — no obligation. Send a message, WhatsApp us, or call directly.
          </p>
        </div>
      </header>

      <Section tone="marble">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-lg border border-border bg-card p-8 shadow-luxe">
            <SectionHeading eyebrow="Project brief" title={<>Start a <span className="text-gold-gradient">conversation.</span></>} />
            {sent ? (
              <div className="mt-10 rounded-md border-gold-hairline bg-gradient-gold p-6 text-navy-deep">
                <p className="font-serif text-2xl">Thanks — we've got your brief.</p>
                <p className="mt-2 text-sm">Vedu will call you back within 24 hours. For anything urgent, WhatsApp +91 95387 72060.</p>
              </div>
            ) : (
              <form
                className="mt-8 grid gap-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (submitting) return;
                  setError(null);
                  const form = e.currentTarget;
                  const fd = new FormData(form);
                  const payload = {
                    name: String(fd.get("name") ?? ""),
                    phone: String(fd.get("phone") ?? ""),
                    email: String(fd.get("email") ?? ""),
                    scope: String(fd.get("scope") ?? ""),
                    message: String(fd.get("message") ?? ""),
                  };
                  setSubmitting(true);
                  try {
                    const res = await fetch("/api/public/enquiry", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    if (!res.ok) {
                      const body = await res.json().catch(() => ({}));
                      throw new Error(body?.error ?? "Failed to send");
                    }
                    setSent(true);
                  } catch (err) {
                    setError(
                      err instanceof Error
                        ? err.message
                        : "Something went wrong. Please try WhatsApp.",
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" required placeholder="Your name" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" required type="tel" placeholder="+91 98765 43210" className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="scope">What are you planning?</Label>
                  <Input id="scope" name="scope" placeholder="e.g. 3BHK interiors, modular kitchen, villa build" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="message">A little about your project</Label>
                  <Textarea id="message" name="message" rows={5} placeholder="Site location, budget range, timeline…" className="mt-2" />
                </div>
                {error && (
                  <p className="text-sm text-destructive" role="alert">{error}</p>
                )}
                <Button type="submit" size="lg" disabled={submitting} className="bg-gradient-gold text-navy-deep hover:opacity-90">
                  <Send className="h-4 w-4" /> {submitting ? "Sending…" : "Send project brief"}
                </Button>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-4">
            <a href="tel:+919538772060" className="hover-elevate flex items-center gap-4 rounded-lg border border-border bg-card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-gradient-gold text-navy-deep"><Phone className="h-5 w-5" /></span>
              <div className="min-w-0">
                <p className="eyebrow text-muted-foreground">Call Vedu</p>
                <p className="mt-1 font-serif text-lg">+91 95387 72060</p>
                <p className="text-sm text-muted-foreground">+91 78926 56285</p>
              </div>
            </a>
            <a href="https://wa.me/919538772060" target="_blank" rel="noopener" className="hover-elevate flex items-center gap-4 rounded-lg border border-border bg-card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-gradient-gold text-navy-deep"><MessageCircle className="h-5 w-5" /></span>
              <div><p className="eyebrow text-muted-foreground">WhatsApp</p><p className="mt-1 font-serif text-lg">Chat with Vedu instantly</p></div>
            </a>
            <a href="mailto:vedaraj.vedu@gmail.com" className="hover-elevate flex items-center gap-4 rounded-lg border border-border bg-card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-gradient-gold text-navy-deep"><Mail className="h-5 w-5" /></span>
              <div><p className="eyebrow text-muted-foreground">Email</p><p className="mt-1 font-serif text-lg">vedaraj.vedu@gmail.com</p></div>
            </a>
            <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-gradient-gold text-navy-deep"><MapPin className="h-5 w-5" /></span>
              <div><p className="eyebrow text-muted-foreground">Studio</p><p className="mt-1 font-serif text-lg">Bengaluru, Karnataka</p></div>
            </div>

            <div className="overflow-hidden rounded-lg border-gold-hairline shadow-luxe">
              <iframe
                title="RK Interiors location — Bengaluru"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d248849.8449497543!2d77.4661398!3d12.9542623!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1719000000000"
                loading="lazy"
                className="aspect-[4/3] w-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
