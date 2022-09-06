import App from '@/view/App';
import HomeScreen from '@/view/home-screen';

export const module = {
  // VALUES
  foo: ['value', 'foo'],

  // TEMPLATES
  App: ['factory', App],
  HomeScreen: ['factory', HomeScreen],
};
