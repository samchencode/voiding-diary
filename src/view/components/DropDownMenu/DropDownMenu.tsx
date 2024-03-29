import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import type {
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
  View,
} from 'react-native';
import { theme } from '@/view/theme';
import { DropDownItem } from '@/view/components/DropDownMenu/DropDownItem';
import { DropDownMediator } from '@/view/components/DropDownMenu/DropDownMediator';
import type { DropDownParent } from '@/view/components/DropDownMenu/DropDownParent';

type DropDownItemSpec = {
  key: number | string;
  label: string;
  iconName: string;
  onPress: () => void;
};

type Props = {
  items: DropDownItemSpec[];
  visible: boolean;
  style?: StyleProp<Animated.WithAnimatedValue<ViewStyle>>;
  onRequestDismiss?: () => void;
};

class DropDownMenu extends React.PureComponent<Props, unknown> {
  static defaultProps = {
    style: {},
    onRequestDismiss: () => {},
  };

  private menuRef: React.RefObject<View>;

  private mediator: DropDownMediator;

  constructor(props: Props) {
    super(props);

    const onRequestDismiss =
      props.onRequestDismiss ?? DropDownMenu.defaultProps.onRequestDismiss;

    this.menuRef = React.createRef();
    this.mediator = new DropDownMediator();
    this.mediator.setMenu(this);
    this.mediator.setViewRef(this.menuRef);
    this.mediator.setOnRequestDismiss(onRequestDismiss);
    this.handleLayout = this.handleLayout.bind(this);
  }

  componentDidUpdate({ visible: prevVisible }: Readonly<Props>) {
    const { visible } = this.props;
    if (prevVisible && !visible) this.mediator.notifyMenuInvisible();
    if (!prevVisible && visible) this.mediator.notifyMenuVisible();
  }

  componentWillUnmount(): void {
    this.mediator.notifyMenuUnmount();
  }

  handleLayout({ nativeEvent }: LayoutChangeEvent) {
    const { visible } = this.props;
    if (visible) this.mediator.notifyVisibleMenuLayout(nativeEvent.layout);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getMediatorAndSetParent(p: DropDownParent) {
    this.mediator.setParent(p);
    return this.mediator;
  }

  render() {
    const { items, visible, style } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          { display: visible ? 'flex' : 'none' },
          style,
        ]}
        ref={this.menuRef}
        onLayout={this.handleLayout}
      >
        {items.map((v) => (
          <DropDownItem
            key={v.key}
            label={v.label}
            iconName={v.iconName}
            onPress={v.onPress}
          />
        ))}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    paddingTop: 8,
    paddingBottom: 8,
    ...theme.shadow,
  },
});

export { DropDownMenu };
export type { DropDownItemSpec };
