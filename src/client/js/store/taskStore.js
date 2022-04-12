import TaskApi from '../api/taskApi.js';
import Store from './store.js';

class TaskStore extends Store {
  #key = 'tasks';

  async init() {
    await this.setTasks();
  }

  async setTasks() {
    const tasks = await TaskApi.getAllTasks();
    this.setState(this.#key, tasks.reverse());
  }

  async enrollTask(taskInfo) {
    const isServerRespondedOK = await TaskApi.enrollTask(taskInfo); // 서버에 저장
    if (!isServerRespondedOK) return false;
    await this.setTasks();
    return true;
  }

  getAllTasks() {
    return this.getState(this.#key);
  }

  getTasksFilteredWithColumn(columnId) {
    const tasks = this.getState(this.#key);
    return tasks.filter(task => task.columnId === columnId);
  }
}

const taskStore = new TaskStore();

export default taskStore;
