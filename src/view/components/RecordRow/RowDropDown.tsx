import React from 'react';
import type {
  StyleProp,
  TouchableOpacity,
  TransformsStyle,
} from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '@/view/theme';
import { IconButton } from '@/view/components/IconButton';
import type { DropDownItemSpec } from '@/view/components/DropDownMenu';
import { DropDownMenu } from '@/view/components/DropDownMenu';
import { Portal } from '@/view/portal';
import type { LayoutRectangle } from '@/view/components/DropDownMenu/LayoutRectangle';
import type { DropDownMediator } from '@/view/components/DropDownMenu/DropDownMediator';
import type { DropDownParent } from '@/view/components/DropDownMenu/DropDownParent';

type Props = {
  options: DropDownItemSpec[];
  id: string;
};

type WindowDimensions = { width: number; height: number };

type State = {
  visible: boolean;
  transparent: boolean;
  menuTransformStyle: StyleProp<TransformsStyle> | null;
};

const makeTransformsFromMenuAndIconMeasurements = (
  { height: windowHeight }: WindowDimensions,
  { width: menuWidth, height: menuHeight }: LayoutRectangle,
  {
    pageX: iconX,
    pageY: iconY,
    width: iconWidth,
    height: iconHeight,
  }: LayoutRectangle
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

class RowDropDown
  extends React.Component<Props, State>
  implements DropDownParent
{
  iconRef: React.RefObject<TouchableOpacity>;

  mediator?: DropDownMediator;

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      menuTransformStyle: null,
      transparent: false,
    };
    this.iconRef = React.createRef();
    this.handleToggle = this.handleToggle.bind(this);
    this.handleMenuRefCallback = this.handleMenuRefCallback.bind(this);
  }

  handleMenuRefCallback(menu: DropDownMenu | null): void {
    this.mediator = menu?.getMediatorAndSetParent(this);
    this.mediator?.setIconRef(this.iconRef);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  handleMenuAndIconMeasured(
    menuRectangle: LayoutRectangle,
    iconRectangle: LayoutRectangle
  ): void {
    const transforms = makeTransformsFromMenuAndIconMeasurements(
      Dimensions.get('window'),
      menuRectangle,
      iconRectangle
    );
    this.setState({ menuTransformStyle: transforms, transparent: false });
  }

  private handleToggle() {
    const { visible } = this.state;
    const newState = !visible;
    this.setState({ visible: newState });
    if (newState === true) this.setState({ transparent: true });
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
    const { visible, menuTransformStyle, transparent } = this.state;

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
            ref={this.handleMenuRefCallback}
            items={options}
            visible={visible}
            style={[
              styles.dropDownMenu,
              menuTransformStyle,
              transparent && { opacity: 0 },
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
