interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Component for rendering JSON-LD structured data
 * Place this in the head of your page to inject structured data
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
}
