import * as ExpoFileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import type { FileSystem } from '@/application/ports/FileSystem';

class ExpoAssetFileSystem implements FileSystem {
  // eslint-disable-next-line class-methods-use-this
  async getAssetAsString(virtualAssetModule: string | number) {
    const asset = await Asset.fromModule(virtualAssetModule).downloadAsync();
    return ExpoFileSystem.readAsStringAsync(asset.localUri as string);
  }
}

export { ExpoAssetFileSystem };
