import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '@/view/theme';
import { IconButton } from '@/view/components/IconButton';
import type { DropDownItemSpec } from '@/view/components/DropDownMenu';
import { DropDownMenu } from '@/view/components/DropDownMenu';

type RowProps = {
  title: string;
  subtitle: string;
  iconName: string;
  options?: DropDownItemSpec[];
};

type RowDropDownProps = {
  options: DropDownItemSpec[];
};

function RowDropDown({ options }: RowDropDownProps) {
  const [visible, setVisible] = useState(false);

  const handleToggle = useCallback(() => setVisible(!visible), [visible]);
  const optionsOnPressToggleVisible = options.map((o) => {
    const onPress = () => {
      handleToggle();
      o.onPress();
    };
    return { ...o, onPress };
  });

  return (
    <>
      <IconButton
        name="ellipsis-v"
        onPress={handleToggle}
        color={theme.colors.dark}
      />
      <DropDownMenu
        items={optionsOnPressToggleVisible}
        visible={visible}
        style={styles.dropDownMenu}
        onPressOut={handleToggle}
      />
    </>
  );
}

function Row({ title, subtitle, iconName, options }: RowProps) {
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
      {options && <RowDropDown options={options} />}
    </View>
  );
}

Row.defaultProps = {
  options: undefined,
};

type RecordRowProps = {
  volume?: string;
  options?: DropDownItemSpec[];
  time: string;
};

function IntakeRecordRow({ volume, time, options }: RecordRowProps) {
  const title = !volume ? 'Intake' : `Intake ${volume}`;
  return (
    <Row
      iconName="glass-whiskey"
      title={title}
      subtitle={time}
      options={options}
    />
  );
}

IntakeRecordRow.defaultProps = { volume: '', options: undefined };

function VoidRecordRow({ volume, time, options }: RecordRowProps) {
  const title = !volume ? 'Void' : `Void ${volume}`;
  return (
    <Row iconName="toilet" title={title} subtitle={time} options={options} />
  );
}

VoidRecordRow.defaultProps = { volume: '', options: undefined };

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
  dropDownMenu: {
    position: 'absolute',
    top: '110%',
    right: 0,
  },
});

export { IntakeRecordRow, VoidRecordRow };
