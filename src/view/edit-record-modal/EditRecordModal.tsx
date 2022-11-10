import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { Card, Button } from '@/view/components';
import { theme } from '@/view/theme';
import type { RootNavigationProps } from '@/view/router';
import type { UpdateRecordAction } from '@/application/UpdateRecordAction';
import type { Observable } from '@/view/observables';
import { StatusBar } from '@/view/status-bar';
import { EditRecordInputVisitor } from '@/view/edit-record-modal/EditRecordInputVisitor';

type EditRecordModalProps = RootNavigationProps<'EditRecordModal'>;

function factory(
  updateRecordAction: UpdateRecordAction,
  recordsStaleObservable: Observable
) {
  return function EditRecordModal({ navigation, route }: EditRecordModalProps) {
    const { width: screenWidth } = useWindowDimensions();
    const width = Math.min(screenWidth - theme.spaces.lg * 2, 400);

    const goBack = useCallback(() => navigation.goBack(), [navigation]);

    const { record: initialRecord } = route.params;
    const id = useMemo(() => initialRecord.getId(), [initialRecord]);
    const [record, setRecord] = useState(initialRecord);

    const updateRecord = useCallback(async () => {
      await updateRecordAction.execute(id, record);
      recordsStaleObservable.notifySubscribers();
      navigation.navigate('App', { screen: 'Record' });
    }, [id, record, navigation]);

    const visitor = useMemo(
      () => new EditRecordInputVisitor(record, setRecord),
      [record]
    );

    return (
      <View style={styles.container}>
        <StatusBar
          color="transparent"
          statusBarStyle="light"
          hasPadding={false}
        />
        <TouchableWithoutFeedback onPress={goBack}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Card style={[styles.card, { width }]}>
          <Text style={styles.title}>Edit Record</Text>
          {visitor.getElement()}
          <View style={styles.buttonGroup}>
            <Button
              title="Back"
              onPress={goBack}
              backgroundColor={theme.colors.gray}
              style={styles.button}
            />
            <Button
              title="Update"
              onPress={updateRecord}
              backgroundColor={theme.colors.accent}
              style={styles.button}
            />
          </View>
        </Card>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.25,
  },
  card: {
    padding: theme.spaces.lg,
  },
  title: {
    ...theme.fonts.lg,
    marginBottom: theme.spaces.sm,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginLeft: theme.spaces.xs,
    marginRight: theme.spaces.xs,
  },
});

export { factory };
export type Type = ReturnType<typeof factory>;
