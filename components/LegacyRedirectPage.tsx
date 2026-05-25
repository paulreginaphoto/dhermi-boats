import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { sitePath } from "@/lib/site";

export function LegacyRedirectPage({ destination = "/" }: { destination?: string }) {
  const targetPath = sitePath(destination);
  const redirectScript = [
    `var target = new URL(${JSON.stringify(targetPath)}, window.location.href);`,
    "var current = new URL(window.location.href);",
    "var params = current.searchParams;",
    'var requested = params.get("dlang") || params.get("lang");',
    'if (requested) target.searchParams.set("dlang", requested);',
    "window.location.replace(target.href);"
  ].join(" ");

  return (
    <section className="bg-limestone py-16 md:py-24">
      <script
        dangerouslySetInnerHTML={{
          __html: redirectScript
        }}
      />
      <meta content={`0;url=${targetPath}`} httpEquiv="refresh" />
      <div className="site-band">
        <div className="max-w-2xl rounded-lg border border-ink/10 bg-pearl p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
            <LocalizedText id="legacy.redirect.label">Redirect</LocalizedText>
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink">
            <LocalizedText id="legacy.redirect.title">This page has moved</LocalizedText>
          </h1>
          <p className="mt-5 text-base leading-8 text-ink-soft">
            <LocalizedText id="legacy.redirect.text">
              Dhermi Boat is now a faster booking site. Continue to the home page.
            </LocalizedText>
          </p>
          <div className="mt-7">
            <ButtonLink href={targetPath} icon={ArrowRight}>
              <LocalizedText id="legacy.redirect.home">Go to home page</LocalizedText>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
