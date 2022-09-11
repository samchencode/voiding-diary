import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FocusContext } from '@/view/goal-screen/components/Input/FocusContext';
import type { FocusContextValue } from '@/view/goal-screen/components/Input/FocusContext';

type InputRootProps = {
  children: JSX.Element;
};

type InputRootState = {
  anInputHasFocus: boolean;
};

class InputRoot extends React.Component<InputRootProps, InputRootState> {
  private focusData: FocusContextValue;

  constructor(props: InputRootProps) {
    super(props);
    this.state = { anInputHasFocus: false };
    this.handlePressOut = this.handlePressOut.bind(this);

    const getFocusState = this.getFocusState.bind(this);
    this.focusData = {
      get hasFocus() {
        return getFocusState();
      },
      setHasFocus: (v: boolean) => this.setState({ anInputHasFocus: v }),
    };
  }

  private handlePressOut() {
    this.blur();
  }

  private getFocusState() {
    const { anInputHasFocus } = this.state;
    return anInputHasFocus;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  blur() {
    Keyboard.dismiss();
    this.setState({ anInputHasFocus: false });
  }

  render() {
    const { children } = this.props;
    return (
      <FocusContext.Provider value={this.focusData}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={this.handlePressOut}
          accessible={false}
        >
          {children}
        </TouchableWithoutFeedback>
      </FocusContext.Provider>
    );
  }
}

export { InputRoot };
