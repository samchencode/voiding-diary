import React from 'react';
import type { TouchableOpacity } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import { IconButton } from '@/view/components/IconButton';
import type { DropDownItemSpec } from '@/view/components/DropDownMenu';
import { DropDownMenu } from '@/view/components/DropDownMenu';
import { Portal } from '@/view/portal';
import type { LayoutRectangle } from '@/view/components/DropDownMenu/LayoutRectangle';
import type { DropDownMediator } from '@/view/components/DropDownMenu/DropDownMediator';

type Props = {
  options: DropDownItemSpec[];
  id: string;
};

type WindowDimensions = { width: number; height: number };

type State = {
  visible: boolean;
  iconRectangle: LayoutRectangle | null;
  menuRectangle: LayoutRectangle | null;
  windowDimensions: WindowDimensions;
};

const makeDropDownTransformFromIconMeasurement = (
  {
    pageX: iconX,
    pageY: iconY,
    width: iconWidth,
    height: iconHeight,
  }: LayoutRectangle,
  { height: windowHeight }: WindowDimensions,
  { width: menuWidth, height: menuHeight }: LayoutRectangle
) => {
  const iconXMax = iconX + iconWidth;
  const iconYMax = iconY + iconHeight;
  const menuYMaxIsBelowWindow = iconYMax + menuHeight < windowHeight;
  return {
    transform: [
      { translateX: iconXMax - menuWidth },
      { translateY: menuYMaxIsBelowWindow ? iconYMax : iconY - menuHeight },
    ],
  };
};

class RowDropDown extends React.Component<Props, State> {
  iconRef: React.RefObject<TouchableOpacity>;

  menuRef: React.RefObject<DropDownMenu>;

  mediator?: DropDownMediator;

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      windowDimensions: Dimensions.get('window'),
      iconRectangle: null,
      menuRectangle: null,
    };
    this.iconRef = React.createRef();
    this.menuRef = React.createRef();

    this.handleToggle = this.handleToggle.bind(this);
    this.handleLayoutDropDown = this.handleLayoutDropDown.bind(this);
  }

  componentDidMount(): void {
    this.mediator = this.menuRef.current?.setParentOnMediator(this);
    // TODO: add iconRef to mediator
  }

  private handleToggle() {
    const { visible } = this.state;
    if (!this.iconRef.current) return;
    this.iconRef.current.measure((x, y, width, height, pageX, pageY) => {
      this.setState({ iconRectangle: { x, y, width, height, pageX, pageY } });
    });
    this.setState({ visible: !visible });
  }

  private handleLayoutDropDown(l: LayoutRectangle) {
    this.setState({ menuRectangle: l });
  }

  private makeMenuOptionsTogglingVisible() {
    const { options } = this.props;
    return options.map((o) => ({
      ...o,
      onPress: () => {
        o.onPress();
        this.handleToggle();
      },
    }));
  }

  render() {
    const { id } = this.props;
    const { visible, menuRectangle, iconRectangle, windowDimensions } =
      this.state;

    const options = this.makeMenuOptionsTogglingVisible();

    return (
      <>
        <IconButton
          name="ellipsis-v"
          onPress={this.handleToggle}
          color={theme.colors.dark}
          ref={this.iconRef}
        />
        <Portal id={`RecordRow.RowDropDown-${id}`}>
          <DropDownMenu
            ref={this.menuRef}
            onLayout={this.handleLayoutDropDown}
            items={options}
            visible={visible}
            style={[
              styles.dropDownMenu,
              iconRectangle &&
                makeDropDownTransformFromIconMeasurement(
                  iconRectangle,
                  windowDimensions,
                  menuRectangle
                ),
            ]}
            onRequestDismiss={this.handleToggle}
          />
        </Portal>
      </>
    );
  }
}

export const styles = StyleSheet.create({
  dropDownMenu: {
    position: 'absolute',
  },
});

export { RowDropDown };
