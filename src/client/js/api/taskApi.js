import { request, BASE_URL, HTTP_METHOD, requestWithoutJson } from './index.js';

const TaskApi = {
  getAllTasks() {
    return request(`${BASE_URL}/tasks?_expand=user`);
  },

  enrollTask(taskInfo) {
    return requestWithoutJson(`${BASE_URL}/tasks`, HTTP_METHOD.POST(taskInfo));
  },
};

export default TaskApi;
