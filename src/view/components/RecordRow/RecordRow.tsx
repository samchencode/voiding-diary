import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '@/view/theme';
import { IconButton } from '@/view/components/IconButton';

type RowProps = {
  title: string;
  subtitle: string;
  iconName: string;
};

function Row({ title, subtitle, iconName }: RowProps) {
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
      <IconButton
        name="ellipsis-v"
        onPress={() => alert('pressed')}
        color={theme.colors.dark}
      />
    </View>
  );
}

type RecordRowProps = {
  volume?: string;
  time: string;
};

function IntakeRecordRow({ volume, time }: RecordRowProps) {
  const title = !volume ? 'Intake' : `Intake ${volume}`;
  return <Row iconName="glass-whiskey" title={title} subtitle={time} />;
}

IntakeRecordRow.defaultProps = { volume: '' };

function VoidRecordRow({ volume, time }: RecordRowProps) {
  const title = !volume ? 'Void' : `Void ${volume}`;
  return <Row iconName="toilet" title={title} subtitle={time} />;
}

VoidRecordRow.defaultProps = { volume: '' };

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
