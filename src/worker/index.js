import { wrap } from 'comlink';
import Worker from './index.worker.js';

export const worker = new Worker();
export const state = wrap(worker);