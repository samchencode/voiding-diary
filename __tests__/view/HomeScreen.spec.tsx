import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreenFactory from '@/view/home-screen';

describe('<HomeScreen />', () => {
  const HomeScreen = HomeScreenFactory();

  it('has 1 child', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();

    // @ts-expect-error shouldnt be null
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
