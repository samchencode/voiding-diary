import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/view/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

function ExportComponent() {
  let listOfRecordsForPDF = '';

  const printToPDF = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const tempArray = listOfRecordsForPDF.split('\n');
    listOfRecordsForPDF = '';
    for (let i = 0; i < tempArray.length - 1; i++) {
      const temp = tempArray[i].substring(tempArray[i].lastIndexOf(',') + 1);
      const temp2 = tempArray[i].substring(0, tempArray[i].lastIndexOf(','));
      const dateTemp = new Date(Number(temp));
      const options = { hour12: true };
      const date = dateTemp.toLocaleString('en-US', options);
      listOfRecordsForPDF += `${temp2.replace(
        ',',
        '&emsp;'
      )}&emsp;${date}<br><br>`;
    }

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
          <h1 style="font-size: 20px; font-family: Helvetica Neue; font-weight: normal;">
      ${listOfRecordsForPDF}
      </h1>
        </body>
      </html>
      `;

    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Save CSV', value: 'CSV' },
    { label: 'Save PDF', value: 'PDF' },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        style={[styles.ddmenu]}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(item) => {
          if (item.value === 'PDF') {
            printToPDF();
          } else if (item.value === 'CSV') {
            alert(listOfRecordsForPDF);
          }
        }}
        textStyle={{ fontSize: 30 }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  emptyListContainer: { flex: 1 },
  list: {
    paddingLeft: theme.spaces.lg,
    paddingRight: theme.spaces.lg,
  },
  card: {
    marginBottom: theme.spaces.sm,
  },
  ddmenu: {
    width: 250,
    height: 50,
    top: 50,
    left: 150,
    backgroundColor: theme.colors.primary,
  },
});

export { ExportComponent };
