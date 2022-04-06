const addAction = (router) => ({ method, path, body }, res, next) => {
  next();

  if (method === 'GET' || path === '/users') return;

  if (
    path.includes('tasks') &&
    method === 'PATCH' &&
    body.column !== undefined
  ) {
    body.prevColumn = router.db
      .get('tasks')
      .find({ id: body.id })
      .value().column;
  }

  router.db
    .get('action')
    .push({
      user: 1,
      type: method,
      contents: body,
      executedTime: new Date(),
    })
    .write();
}

export default addAction;
