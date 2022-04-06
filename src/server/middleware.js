const addAction = (db) => async (req, res, next) => {
  const actionContents = {
    POST: [req.body.column, req.body.title],
    DELETE: [req.body.column, req.body.title],
    PUT: [req.body.title, req.body.contents],
  };

  next();
  if (req.method === 'GET') return;

  db.data.action.push({
    user: 1,
    type: req.method,
    contents: actionContents[req.method],
    executedTime: new Date(),
  });
  await db.write();
}

export default addAction;
