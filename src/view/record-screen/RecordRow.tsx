import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '@/view/theme';

type RowProps = {
  title: string;
  subtitle?: string;
  rightText: string;
  iconName: string;
};

function Row({ title, subtitle, rightText, iconName }: RowProps) {
  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        size={40}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Text>
      <Text style={styles.data}>{rightText}</Text>
    </View>
  );
}

Row.defaultProps = {
  subtitle: '',
};

type RecordRowProps = {
  label: string;
  volume?: string;
  time: string;
};

function IntakeRecordRow({ label, volume, time }: RecordRowProps) {
  return (
    <Row
      iconName="glass-whiskey"
      title={label}
      subtitle={volume}
      rightText={time}
    />
  );
}

IntakeRecordRow.defaultProps = { volume: '' };

function VoidRecordRow({ label, volume, time }: RecordRowProps) {
  return (
    <Row iconName="toilet" title={label} subtitle={volume} rightText={time} />
  );
}

VoidRecordRow.defaultProps = { volume: '' };

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spaces.sm,
  },
  icon: {
    marginRight: theme.spaces.sm,
    width: 40,
    height: 40,
    textAlign: 'center',
  },
  title: {
    ...theme.fonts.mdBold,
  },
  subtitle: {
    ...theme.fonts.sm,
  },
  data: {
    ...theme.fonts.md,
    flex: 1,
    textAlign: 'right',
  },
});

export { IntakeRecordRow, VoidRecordRow };
