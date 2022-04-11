import { request, BASE_URL } from './index.js';

const TaskApi = {
  getAllTasks() {
    return request(`${BASE_URL}/tasks?_expand=user`);
  }
}

export default TaskApi;
