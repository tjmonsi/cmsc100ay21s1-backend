import { expose } from 'comlink';

const store = {
  data: {},
  fns: {},
  set: async function (key, value) {
    this.data[`${key}`] = value;
    if (this.fns[key]) {
      for (const fn of Object.keys(this.fns[key])) {
        await this.fns[key][`${fn}`](this.data[`${key}`]);
      }
    }
  },
  get: function (key) {
    return this.data[`${key}`];
  },
  subscribe: function (key, callbackName, callback) {
    if (!this.fns[`${key}`]) {
      this.fns[`${key}`] = {};
    }
    if (this.fns[`${key}`][`${callbackName}`]) {
      throw new Error(`${callbackName} already exists as function for '${key}'`);
    }
    this.fns[`${key}`][callbackName] = callback;
  },
  unsubscribe: function (key, callbackName) {
    if (!this.fns[`${key}`]) {
      throw new Error(`${key} doesn't exist`);
    }
    if (!this.fns[`${key}`][`${callbackName}`]) {
      throw new Error(`${callbackName} already exists as function for ${key}`);
    }
    delete this.fns[`${key}`][callbackName];
  }
};

expose(store);
