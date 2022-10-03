interface Exporter {
  export(data: string): Promise<void>;
}

export type { Exporter };
