type InlineRuntimeScriptProps = {
  id: string;
  code: string;
};

export function InlineRuntimeScript({ id, code }: InlineRuntimeScriptProps) {
  return <script id={id} dangerouslySetInnerHTML={{ __html: code }} />;
}
