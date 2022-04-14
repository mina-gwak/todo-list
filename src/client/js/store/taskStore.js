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

  async editTask(taskInfo, taskId) {
    const editedTask = await TaskApi.editTask(taskInfo, taskId);
    if (!editedTask) return false;
    await this.setTasks();
    return true;
  }

  async enrollTask(taskInfo) {
    const order = this.getTasksFilteredWithColumn(taskInfo.columnId).length + 1;
    const newTask = await TaskApi.enrollTask({ ...taskInfo, order });
    if (!newTask) return false;
    await this.setTasks();
    return true;
  }

  getAllTasks() {
    return this.getState(this.#key);
  }

  getTasksFilteredWithColumn(columnId) {
    const tasks = this.getState(this.#key);
    return tasks.filter(task => task.columnId === columnId).sort((taskA, taskB) => taskB.order - taskA.order);
  }

  async deleteTask(taskId) {
    await TaskApi.deleteTask(taskId);
    await this.setTasks();
  }
}

const taskStore = new TaskStore();

export default taskStore;
