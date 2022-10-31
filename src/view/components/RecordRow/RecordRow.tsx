import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '@/view/theme';
import type { DropDownItemSpec } from '@/view/components/DropDownMenu';
import { RowDropDown } from '@/view/components/RecordRow/RowDropDown';

type RowProps = {
  title: string;
  subtitle: string;
  iconName: string;
  id?: string;
  options?: DropDownItemSpec[];
};

function Row({ title, subtitle, iconName, options, id: key = '0' }: RowProps) {
  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        size={40}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <View style={styles.titleGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {options && <RowDropDown options={options} id={key} />}
    </View>
  );
}

Row.defaultProps = {
  options: undefined,
  id: '0',
};

type RecordRowProps = {
  volume?: string;
  options?: DropDownItemSpec[];
  time: string;
  id?: string;
};

function IntakeRecordRow({ volume, time, options, id }: RecordRowProps) {
  const title = !volume ? 'Intake' : `Intake ${volume}`;
  return (
    <Row
      iconName="glass-whiskey"
      title={title}
      subtitle={time}
      options={options}
      id={id}
    />
  );
}

IntakeRecordRow.defaultProps = { volume: '', options: undefined, id: '0' };

function VoidRecordRow({ volume, time, options, id }: RecordRowProps) {
  const title = !volume ? 'Void' : `Void ${volume}`;
  return (
    <Row
      iconName="toilet"
      title={title}
      subtitle={time}
      options={options}
      id={id}
    />
  );
}

VoidRecordRow.defaultProps = { volume: '', options: undefined, id: '0' };

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spaces.lg,
    paddingTop: theme.spaces.sm,
    paddingBottom: theme.spaces.sm,
    paddingRight: theme.spaces.xl - 12,
  },
  icon: {
    marginRight: theme.spaces.lg,
    width: 40,
    height: 40,
    textAlign: 'center',
  },
  titleGroup: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.fonts.smBold,
  },
  subtitle: {
    ...theme.fonts.xs,
  },
  dropDownToggle: {
    width: 48,
    height: 48,
  },
});

export { IntakeRecordRow, VoidRecordRow };
