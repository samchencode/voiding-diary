import registerRootComponent from 'expo/build/launch/registerRootComponent';
import type { Type as App } from '@/App';
import container from '@/di';

const Root = container.get<App>('App')

registerRootComponent(Root);

// @ts-ignore
container.invoke((foo) => console.log(`${foo} from @/index.ts`));