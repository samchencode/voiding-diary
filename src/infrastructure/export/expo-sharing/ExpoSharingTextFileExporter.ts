import * as FileSystem from 'expo-file-system';
import * as ExpoSharing from 'expo-sharing';
import type { Exporter } from '@/application/ports/Exporter';
import { Platform } from 'react-native';
import { UsedBeforeConfigureError } from '@/infrastructure/export/expo-sharing/UsedBeforeConfigureError';

class ExpoSharingTextFileExporter implements Exporter {
  private contents?: string;

  private fileExtension?: string;

  private mimeType?: string;

  configure(contents: string, fileExtension: string, mimeType: string) {
    this.contents = contents;
    this.fileExtension = fileExtension;
    this.mimeType = mimeType;
  }

  async export(): Promise<void> {
    if (
      typeof this.contents === 'undefined' ||
      typeof this.fileExtension === 'undefined' ||
      typeof this.mimeType === 'undefined'
    )
      throw new UsedBeforeConfigureError();
    if (Platform.OS !== 'android' && Platform.OS !== 'ios') return;
    const fileUriScheme = Platform.OS === 'android' ? 'file:///' : 'file://';
    const filename = Buffer.from(Math.random().toString(), 'base64').toString(
      'base64'
    );
    const uri = fileUriScheme + filename + this.fileExtension;
    await FileSystem.writeAsStringAsync(uri, this.contents);
    await ExpoSharing.shareAsync(uri, {
      UTI: this.fileExtension,
      mimeType: this.mimeType,
      dialogTitle: 'Export File',
    });
  }
}

export { ExpoSharingTextFileExporter };
