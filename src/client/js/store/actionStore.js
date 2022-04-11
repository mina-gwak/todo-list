import ActionApi from '../api/actionApi.js';
import Store from './store.js';

class ActionStore extends Store {

  #key = 'actions';

  async init() {
    const actions = await ActionApi.getAllActions();
    this.setState('actions', actions);
  }

  getActions() {
    return this.getState(this.#key);
  }
}

const actionStore = new ActionStore();

export default actionStore;