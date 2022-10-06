interface Exporter {
  export(): Promise<void>;
}

interface PdfExporter extends Exporter {
  configure(html: string): void;
}

export type { Exporter, PdfExporter };
