import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SectionList, Image, Dimensions } from 'react-native';
import { InternMap, reduce } from 'd3-array';
import { d3 } from '@/vendor/d3';
import { theme } from '@/view/theme';
import {
  RecordSectionHeader,
  ListHeaderComponent,
  ListEmptyComponent,
} from '@/view/record-screen/components';
import { GetAllRecordsAction } from '@/application/GetAllRecordsAction';
import { IntakeRecord, Record } from '@/domain/models/Record';
import { RecordsStaleObservable, ViewRecordVisitor } from '@/view/lib';
import DropDownPicker from 'react-native-dropdown-picker';
import Constants from 'expo-constants';
import { Button, Card } from '@/view/components';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
//import RNPrint from 'react-native-print';
import { RecentRecordList } from '@/view/home-screen/components';
import { DateAndTime } from '@/domain/models/DateAndTime';




function ExportComponent() {

  const printToPDF = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    var tempArray = listOfRecordsForPDF.split("\n");
    listOfRecordsForPDF = "";
    for (var i = 0; i < tempArray.length - 1; i++) {
      var temp = tempArray[i].substring(tempArray[i].lastIndexOf(",") + 1);
      var temp2 = tempArray[i].substring(0, tempArray[i].lastIndexOf(","));
      var dateTemp = new Date(Number(temp));
      var options = {
        hour12: true
      };
      var date = dateTemp.toLocaleString('en-US', options);
      listOfRecordsForPDF += temp2.replace(",", "&emsp;") + "&emsp;" + date + "<br><br>";
    }

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
          <h1 style="font-size: 20px; font-family: Helvetica Neue; font-weight: normal;">`
      +
      listOfRecordsForPDF
      +
      `</h1>
        </body>
      </html>
      `;

    const { uri } = await Print.printToFileAsync({
      html
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Save CSV', value: 'CSV', },
    { label: 'Save PDF', value: 'PDF', }
  ]);

  var listOfRecordsForPDF = "";

  return (
    <View style={styles.container}>

      <DropDownPicker style={[styles.ddmenu,]}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(item) => {
          if (item.value == "PDF") {
            printToPDF();
          }
          else if (item.value == "CSV") {
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