/* eslint-disable class-methods-use-this */
import * as ExpoPrint from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as ExpoSharing from 'expo-sharing';
import type { Exporter } from '@/application/ports/Exporter';
import { Platform } from 'react-native';

class ExpoSharingExporter implements Exporter {
  async exportAsPdf(html: string): Promise<void> {
    const { uri } = await ExpoPrint.printToFileAsync({ html });
    await ExpoSharing.shareAsync(uri, {
      UTI: '.pdf',
      mimeType: 'application/pdf',
      dialogTitle: 'Export as PDF',
    });
  }

  async exportAsFile(
    contents: string,
    fileExtension: string,
    mimeType: string
  ): Promise<void> {
    if (Platform.OS !== 'android' && Platform.OS !== 'ios') return;
    const fileUriScheme = Platform.OS === 'android' ? 'file:///' : 'file://';
    const filename = Buffer.from(Math.random().toString(), 'base64').toString(
      'base64'
    );
    const uri = fileUriScheme + filename + fileExtension;
    await FileSystem.writeAsStringAsync(uri, contents);
    await ExpoSharing.shareAsync(uri, {
      UTI: fileExtension,
      mimeType,
      dialogTitle: 'Export File',
    });
  }
}

export { ExpoSharingExporter };
