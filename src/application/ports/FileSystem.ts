interface FileSystem {
  getAssetAsString(virtualAssetModule: string | number): Promise<string>;
}

export type { FileSystem };
