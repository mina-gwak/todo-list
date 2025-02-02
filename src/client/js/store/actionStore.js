import ActionApi from '../api/actionApi.js';
import Store from './store.js';
import { cloneDeep } from 'lodash';

class ActionStore extends Store {
  #key = 'actions';
  #toggleKey = 'isActionLayerActive';

  async init() {
    await this.setActions();
    this.setState(this.#toggleKey, false);
  }

  getAllActions() {
    return cloneDeep(this.getState(this.#key));
  }

  getIsActionLayerActive() {
    return this.getState(this.#toggleKey);
  }

  toggleIsActionLayerActive() {
    this.setState(this.#toggleKey, !this.getState('isActionLayerActive'));
  }

  async setActions() {
    const actions = await ActionApi.getAllActions();
    this.setState(this.#key, actions);
  }
}

const actionStore = new ActionStore();

export default actionStore;
