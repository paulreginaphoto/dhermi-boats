import Script from "next/script";

type InlineRuntimeScriptProps = {
  id: string;
  code: string;
};

export function InlineRuntimeScript({ id, code }: InlineRuntimeScriptProps) {
  const props = {
    id,
    dangerouslySetInnerHTML: { __html: code }
  };

  if (process.env.NODE_ENV === "production") {
    return <script {...props} />;
  }

  return <Script {...props} strategy="afterInteractive" />;
}
