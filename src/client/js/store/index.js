import ActionStore from './actionStore.js';
import TaskStore from './taskStore.js';
import ColumnStore from './columnStore.js';

const initStore = async () => {
  await ActionStore.init();
  await TaskStore.init();
  await ColumnStore.init();
}

export { ActionStore, TaskStore, ColumnStore, initStore };
