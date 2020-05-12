type asyncFunc = () => Promise<unknown>;

const result: unknown[] = [];

async function multiRequest(asyncFuncs: asyncFunc[], max: number = 2) {
  const promises = asyncFuncs.map((f) => () => f().then(res => {
    result.push(res);
    return res;
  }))
  const group = Array.from({ length: max }, (_, i) => i)
    .map(i => promises.filter((_,j) => j % max === i))
    .map(funcs => funcs.reduce(
        (prev, current) => prev.then(() => current()),
        Promise.resolve() as Promise<unknown>
      )
    );
  await Promise.all(group);
  console.log(result);
}

const funcs = Array.from({ length: 50 }, (_, i) => () => Promise.resolve(i));
multiRequest(funcs, 5);