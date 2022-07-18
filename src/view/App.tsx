import type { Type as HomeScreen } from '@/view/home-screen';

const ComponentFactory = (HomeScreen: HomeScreen) => () => {
  return <HomeScreen />;
};

type Type = ReturnType<typeof ComponentFactory>;

export default ComponentFactory;
export type { Type };
