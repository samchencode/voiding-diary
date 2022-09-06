import { factory as App } from '@/view/App';
import { factory as HomeScreen } from '@/view/home-screen';

export const module = {
  // VALUES
  foo: ['value', 'foo'],

  // TEMPLATES
  App: ['factory', App],
  HomeScreen: ['factory', HomeScreen],
};
