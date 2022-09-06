import { Injector } from 'didi';
import { module } from '@/di/dependencies';

export const container = new Injector([module]);
