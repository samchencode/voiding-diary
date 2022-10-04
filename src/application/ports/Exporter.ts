interface Exporter {
  exportAsPdf(html: string): Promise<void>;
  exportAsFile(
    data: string,
    fileExtension: string,
    mimeType: string
  ): Promise<void>;
}

export type { Exporter };
