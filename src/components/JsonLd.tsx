/**
 * Renders a schema.org object as a JSON-LD script tag.
 *
 * The `<` escape is the guard from the Next.js JSON-LD guide: it stops a
 * string in the data (a show description, say) from closing the script tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
