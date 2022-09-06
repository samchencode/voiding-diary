import registerRootComponent from 'expo/build/launch/registerRootComponent';
import type { Type as App } from '@/view/app';
import { container } from '@/di';

// Polyfill for Intl API on Android
import 'intl';
import 'intl/locale-data/jsonp/en';

const Root = container.get<App>('App');

registerRootComponent(Root);
