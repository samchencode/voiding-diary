import React from 'react';
import type { TouchableOpacity } from 'react-native';
import { Dimensions, StyleSheet, Animated } from 'react-native';
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
  screenHeight?: number;
};

type State = {
  visible: boolean;
  transparent: boolean;
  menuTranslateX: number;
  menuTranslateY: number;
};

const makeTransformsFromMenuAndIconMeasurements = (
  { width: menuWidth, height: menuHeight }: LayoutRectangle,
  {
    pageX: iconX,
    pageY: iconY,
    width: iconWidth,
    height: iconHeight,
  }: LayoutRectangle,
  screenHeight: number = Dimensions.get('window').height
) => {
  const iconXMax = iconX + iconWidth;
  const iconYMax = iconY + iconHeight;
  const menuYMaxIsBelowWindow = iconYMax + menuHeight < screenHeight;
  return {
    translateX: iconXMax - menuWidth,
    translateY: menuYMaxIsBelowWindow ? iconYMax : iconY - menuHeight,
  };
};

class RowDropDown
  extends React.Component<Props, State>
  implements DropDownParent
{
  private iconRef: React.RefObject<TouchableOpacity>;

  private mediator?: DropDownMediator;

  static defaultProps = {
    screenHeight: undefined,
  };

  private menuTransforms = {
    translateX: new Animated.Value(0),
    translateY: new Animated.Value(0),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      transparent: false,
      menuTranslateX: 0,
      menuTranslateY: 0,
    };
    this.iconRef = React.createRef();
    this.handleToggle = this.handleToggle.bind(this);
    this.handleMenuRefCallback = this.handleMenuRefCallback.bind(this);
  }

  componentDidUpdate(
    _prevProps: Readonly<Props>,
    {
      menuTranslateX: oldTranslateX,
      menuTranslateY: oldTranslateY,
    }: Readonly<State>
  ): void {
    const {
      menuTranslateX: newTranslateX,
      menuTranslateY: newTranslateY,
      visible,
    } = this.state;
    if (!visible) return;
    if (oldTranslateX !== newTranslateX || oldTranslateY !== newTranslateY) {
      // need to notify mediator once menu translate is done
      const { translateX, translateY } = this.menuTransforms;
      const xAnim = Animated.timing(translateX, {
        toValue: newTranslateX,
        duration: 20,
        useNativeDriver: true,
      });
      const yAnim = Animated.timing(translateY, {
        toValue: newTranslateY,
        duration: 20,
        useNativeDriver: true,
      });
      Animated.parallel([xAnim, yAnim]).start(() => {
        this.mediator?.notifyParentVisibleMenuTransformUpdated();
      });
    }
  }

  handleMenuRefCallback(menu: DropDownMenu | null): void {
    this.mediator = menu?.getMediatorAndSetParent(this);
    this.mediator?.setIconRef(this.iconRef);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  handleMenuLayoutDoneAndIconMeasured(
    menuRectangle: LayoutRectangle,
    iconRectangle: LayoutRectangle
  ): void {
    const { screenHeight } = this.props;
    const { translateX, translateY } =
      makeTransformsFromMenuAndIconMeasurements(
        menuRectangle,
        iconRectangle,
        screenHeight
      );
    this.setState({
      menuTranslateX: translateX,
      menuTranslateY: translateY,
      transparent: false,
    });
  }

  private handleToggle() {
    const { visible } = this.state;
    const newState = !visible;
    this.setState({ visible: newState });
    if (newState === true) this.setState({ transparent: true });
    if (newState === false)
      this.setState({ menuTranslateX: 0, menuTranslateY: 0 });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  isMenuPositionAbsolute(): boolean {
    return true;
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
    const { visible, transparent } = this.state;
    const { translateX, translateY } = this.menuTransforms;
    const menuTransformStyle = {
      transform: [{ translateX }, { translateY }],
    };

    const options = this.makeMenuOptionsTogglingVisible();

    return (
      <>
        <IconButton
          name="ellipsis-v"
          onPress={this.handleToggle}
          color={theme.colors.dark}
          ref={this.iconRef}
        />
        <Portal id={`RowDropDown-${id}`}>
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
