class Promise {
    constructor(executor) {
        this.status = "pending";
        this.value = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach(f => f());
            }
        }

        const reject = (reason) => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.reason = reason;
                this.onRejectedCallbacks.forEach(f => f());
            }
        }

        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
        
    }

    then = (onFulfilled, onRejected) => {
        console.log(this.status);
        if (this.status === "pending") {
            return new Promise((resolve, reject) => {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const ret = onFulfilled(this.value);
                        resolve(ret);
                    } catch(e) {
                        reject(e);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        const ret = onRejected(this.reason);
                        resolve(ret);
                    } catch(e) {
                        reject(e);
                    }
                });
            })
        }
        if (this.status === "fulfilled") {
            return new Promise((resolve, reject) => {
                try {
                    const ret = onFulfilled(this.value);
                    resolve(ret);
                } catch(e) {
                    reject(e);
                }
            });
        }
        if (this.status === "rejected") {
            return new Promise((resolve, reject) => {
                try {
                    const ret = onRejected(this.reason);
                    resolve(ret);
                } catch(e) {
                    reject(e);
                }
            });
        }
    }
}
console.log("start");
const promise = new Promise((resolve) => {
    console.log("step 1");
    throw new Error(1);
});

promise.then(value => {
    console.log("step 2", value);
    return value;
}, reason => {
    console.log("stpe2 reason", reason);
    return reason;
}).then(value2 => {
    console.log("step 3", value2);
}, reason2 => console.log("stpe3 reason", reason2));
console.log("end");