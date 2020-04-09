const toProxy = (obj) => {
    return new Proxy(obj, {
        get(target, key) {
            if (typeof target[key] === "object") {
                return toProxy(target[key]);
            }
            return Reflect.get(target, key);
        },
        set(target, key, value, reciever) {
            console.log(`set key: ${key}, value: ${value}`);
            return Reflect.set(target, key, value, reciever); 
        }
    });
}

const obj = {
    name: "obj",
    arr: []
}

const proxy = toProxy(obj)

// proxy.name = "obj new";
proxy.arr = [1, 2, 3];