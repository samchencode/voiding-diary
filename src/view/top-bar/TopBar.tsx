import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import type { BottomTabHeaderProps as Props } from '@react-navigation/bottom-tabs';
import {
  TopBarRightDefault,
  TopBarRightRecordScreen,
  DropDownMenu,
} from '@/view/top-bar/components';
import type { ExportReportOfAllRecordsAsPdfAction } from '@/application/ExportReportOfAllRecordsAsPdfAction';

type State = {
  dropDownVisible: boolean;
};

function factory(
  exportReportOfAllRecordsAsPdfAction: ExportReportOfAllRecordsAsPdfAction
) {
  const handlePressExport = () => {
    exportReportOfAllRecordsAsPdfAction.execute();
  };

  return class TopBar extends React.PureComponent<Props, State> {
    dropDownItems = [
      {
        key: 1,
        label: 'About',
        iconName: 'info-circle',
        onPress: () => alert('pressed about'),
      },
      {
        key: 2,
        label: 'Attributions',
        iconName: 'file',
        onPress: () => alert('pressed attr'),
      },
    ];

    constructor(props: Props) {
      super(props);
      this.state = {
        dropDownVisible: false,
      };
    }

    private toggleDropDown = () => {
      const { dropDownVisible } = this.state;
      this.setState({
        dropDownVisible: !dropDownVisible,
      });
    };

    render() {
      const { route, options } = this.props;
      const { dropDownVisible } = this.state;

      return (
        <View style={styles.container}>
          <View style={styles.right}>
            {route.name === 'Record' ? (
              <TopBarRightRecordScreen
                color={options.headerTintColor}
                onPressDropDown={() => this.toggleDropDown()}
                onPressExport={handlePressExport}
              />
            ) : (
              <TopBarRightDefault
                color={options.headerTintColor}
                onPress={() => this.toggleDropDown()}
              />
            )}
          </View>
          <DropDownMenu items={this.dropDownItems} visible={dropDownVisible} />
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    paddingRight: 4,
    height: 64,
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'flex-end',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export { factory };
export type Type = ReturnType<typeof factory>;
