const OperationMap = new WeakMap();

module.exports = exports = function enquene(context, task) {
  let resolve, reject;
  const next = new Promise(function(res, rej) {
    resolve = res;
    reject = rej;
  });

  let operation = OperationMap.get(context) || new Promise.resolve();
  operation = operation.then(resolver).catch(console.warn);
  OperationMap.set(context, operation);

  return next;

  function resolver() {
    return execute(task).then(resolve).catch(reject)
  }
}

async function execute(task) {
  return task();
}