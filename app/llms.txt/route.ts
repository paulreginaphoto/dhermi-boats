import { canonical } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const txt = `# Dhermi Boat

Dhermi Boat is a local Dhermi boat tour operator on the Albanian Riviera near Dhërmi.

- Private and group Dhermi boat tours with departure from Dhërmi area.
- Destinations include Gjipe, Grama Bay, and Blue Cave on the Grama route.
- WhatsApp-first booking workflow.
- Social: Instagram and TikTok.
- Booking email and phone contacts available on the website.

Main pages:
- ${canonical("/")}
- ${canonical("/tours/")}
- ${canonical("/tours/private/")}
- ${canonical("/destinations/")}
- ${canonical("/faq/")}
- ${canonical("/contact/")}
`;

  return new Response(txt, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
