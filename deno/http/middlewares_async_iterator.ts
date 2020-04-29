type MiddleWare<T = {}> = (ctx: T, next: () => Promise<void>) => Promise<void>;  

class Middlewares<T = {}> {
    middlewares: MiddleWare<T>[];
    constructor() {
        this.middlewares = [];
    }

    use = (middleware: MiddleWare<T>) => {
        this.middlewares.push(middleware)
    }

    async *asyncIterator(): AsyncIterableIterator<MiddleWare<T>> {
       for (let i = this.middlewares.length - 1; i >= 0; i--) {
           yield this.middlewares[i];
       }
    }
}

const compose = <T>(middlewares: Middlewares<T>) => (ctx: T) => {
    const handlers = middlewares.middlewares;
    const dispatch = (i : number): Promise<void> => {
        const middleware = handlers[i];
        if (middleware !== undefined) {
            const next = () => dispatch(i + 1);
            return Promise.resolve(middleware(ctx, next));
        }
        return Promise.resolve()
    }
    return dispatch(0);
}

const compose2 = <T>(middlewares: Middlewares<T>) => async (ctx: T) => {
    let current = () => Promise.resolve();
    for await (const middleware of middlewares.asyncIterator()) {
        const temp = current;
        const next = () => middleware(ctx, temp);
        current = next;
    } 
    return current();
}

interface Ctx {
    name?: string;
    age?: number;
    gender?: "male" | "female";
};

const ctx: Ctx = {};
const setName: MiddleWare<Ctx> = async (ctx, next) => {
    ctx.name = "Jack";
    await next();
    console.log("name: ", ctx.name);
};
const setAge: MiddleWare<Ctx> = async (ctx, next) => {
    ctx.age = 10;
    await next();
    console.log("age: ", ctx.age);
};
const setGender: MiddleWare<Ctx> = async (ctx, next) => {
    ctx.gender = "male";
    await next();
    console.log("gender: ", ctx.gender);
};


const middlewares = new Middlewares<Ctx>();
middlewares.use(setName);
middlewares.use(setAge);
middlewares.use(setGender);

(async () => {
    // await compose(middlewares)(ctx);
    await compose2(middlewares)(ctx);
    console.log(ctx);
})();