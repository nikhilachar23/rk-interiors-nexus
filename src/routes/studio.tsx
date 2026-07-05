import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/studio")({
  beforeLoad: () => {
    throw redirect({ href: "https://rk-interiors.sanity.studio/" });
  },
  component: () => null,
});
