import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';
import { theme } from '@/view/theme';
import { DropDownItem } from '@/view/components/DropDownMenu/DropDownItem';
import { DropDownTouchOutHandler } from '@/view/components/DropDownMenu/DropDownTouchOutHandler';
import type { LayoutRectangle } from '@/view/components/DropDownMenu/LayoutRectangle';
import { DropDownBackHandler } from '@/view/components/DropDownMenu/DropDownBackHandler';
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
  style?: StyleProp<ViewStyle>;
  onRequestDismiss?: () => void;
  onLayout?: (l: LayoutRectangle) => void; // FIXME: unclear that we need this...
};

class DropDownMenu extends React.PureComponent<Props, unknown> {
  static defaultProps = {
    style: {},
    onRequestDismiss: () => {},
    onLayout: undefined,
  };

  private menuRef: React.RefObject<View>;

  private mediator: DropDownMediator;

  private toDoOnLayout: (() => void)[] = [];

  constructor(props: Props) {
    super(props);

    const onRequestDismiss =
      props.onRequestDismiss ?? DropDownMenu.defaultProps.onRequestDismiss;

    this.menuRef = React.createRef();
    this.mediator = new DropDownMediator();
    this.mediator.setMenu(this);
    this.mediator.setViewRef(this.menuRef);
    // eslint-disable-next-line no-new
    new DropDownTouchOutHandler(this.mediator, onRequestDismiss);
    // eslint-disable-next-line no-new
    new DropDownBackHandler(this.mediator, onRequestDismiss);

    this.handleLayout = this.handleLayout.bind(this);
  }

  componentDidUpdate({ visible: prevVisible }: Readonly<Props>) {
    const { visible } = this.props;
    if (prevVisible && !visible) this.mediator.notifyMenuInvisible();
    if (!prevVisible && visible) {
      const fn = () => this.mediator.notifyMenuVisible();
      this.toDoOnLayout.push(fn);
    }
  }

  handleLayout({ nativeEvent }: LayoutChangeEvent) {
    // TODO: Remove this when we fully use mediator
    const { onLayout } = this.props;
    if (onLayout) onLayout(nativeEvent.layout as any);
    this.toDoOnLayout.forEach((fn) => fn());
    this.toDoOnLayout = [];
  }

  setParentOnMediator(p: DropDownParent) {
    this.mediator.setParent(p);
    return this.mediator;
  }

  render() {
    const { items, visible, style } = this.props;

    return (
      <View
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
      </View>
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
