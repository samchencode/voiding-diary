import * as ExpoPrint from 'expo-print';
import * as ExpoSharing from 'expo-sharing';
import type { Exporter } from '@/application/ports/Exporter';
import { UsedBeforeConfigureError } from '@/infrastructure/export/expo-sharing/UsedBeforeConfigureError';

class ExpoSharingPdfExporter implements Exporter {
  private html?: string;

  configure(html: string) {
    this.html = html;
  }

  async export(): Promise<void> {
    if (typeof this.html === 'undefined') throw new UsedBeforeConfigureError();

    const { uri } = await ExpoPrint.printToFileAsync({ html: this.html });
    await ExpoSharing.shareAsync(uri, {
      UTI: '.pdf',
      mimeType: 'application/pdf',
      dialogTitle: 'Export as PDF',
    });
  }
}

export { ExpoSharingPdfExporter };
