import ColumnApi from '../api/columnApi.js';
import Store from './store.js';

class Columnstore extends Store {

  #key = 'columns';

  async init() {
    const columns = await ColumnApi.getAllColumns();
    this.setState(this.#key, columns);
  }

  getAllColumns() {
    return this.getState(this.#key);
  }
}

const columnStore = new Columnstore();

export default columnStore;
