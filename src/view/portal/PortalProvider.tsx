import React from 'react';
import type { ReactNode } from 'react';
import { PortalContext } from '@/view/portal/PortalContext';

type Props = {
  children: ReactNode | ReactNode[];
};

type State = {
  content: { [key: string]: ReactNode | ReactNode[] };
};

class PortalProvider extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: {},
    };
    this.setPortal = this.setPortal.bind(this);
  }

  setPortal(id: string, content: ReactNode | ReactNode[]) {
    this.setState(({ content: oldContent }) => {
      const newContent = { ...oldContent };
      newContent[id] = content;
      return { content: newContent };
    });
  }

  render() {
    const { children } = this.props;
    const { content } = this.state;

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <PortalContext.Provider value={{ setPortal: this.setPortal }}>
        {children}
        {Object.values(content)}
      </PortalContext.Provider>
    );
  }
}

export { PortalProvider };
