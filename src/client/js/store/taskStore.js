import TaskApi from '../api/taskApi.js';
import Store from './store.js';

class TaskStore extends Store {

  #key = 'tasks';

  async init() {
    const tasks = await TaskApi.getAllTasks();
    this.setState(this.#key, tasks);
  }

  getTasks() {
    return this.getState(this.#key);
  }

  getTasksFilteredWithColumn(columnId) {
    const tasks = this.getState(this.#key);
    return tasks.filter(task => task.columnId === columnId);
  }
}

const taskStore = new TaskStore();

export default taskStore;
