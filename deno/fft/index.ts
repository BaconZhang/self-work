import Complex from "./complex.ts";
/**
 * 欧拉公式： e^(i * x) = cos(x) + i * sin(x)
 * e^(-2 * Math.PI  * k * n * i / N) = cos(-2 * Math.PI * k * n / N) + i * sin(-2 * Math.PI  * k * n / N)
 */
class W extends Complex {
    constructor(k: number, n: number, N: number) {
        const c = -2 * Math.PI * k * n / N
        const r = Math.cos(c);
        const i = Math.sin(c);
        super(r, i);
    }
}
/**
 *  如果长度不是2的整次幂，进行补零
 */
function fillZero(signal: Complex[]) {
    const len = signal.length;
    if (len === 1) {
        return [...signal, new Complex(0, 0)];
    }
    if (Math.log2(len) % 1 !== 0) {
        return [...signal].concat(
            Array.from(
                { length: 2 ** Math.ceil(Math.log2(len)) - len },
                () => new Complex(0, 0)
            )
        );
    }
    return signal;
}
/**
 * 原始的DFT，公式见：https://zh.wikipedia.org/wiki/%E7%A6%BB%E6%95%A3%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2
 */
function dft(signal: Complex[]) {
    signal = fillZero(signal);
    const N = signal.length;
    return signal.map((_, k) => signal
        .map((x,n) => new W(k, n, N).mul(x))
        .reduce((prev, current) => prev.add(current))
        .fix()
    )
}

function fft(signal: Complex[]) {
    signal = fillZero(signal);
    const N = signal.length;

    function butterfly(a: Complex[], b: Complex[]): Complex[] {
        const compute = (m: Complex[], n: Complex[], flag: 1 | -1) => m.map(
            (i, k) => i.add(
                n[k].mul(new W(k, 1, N)).mul(new Complex(flag, 0))
            ).fix()
        )
        return [
            ...compute(a, b, 1),
            ...compute(a, b, -1)
        ]
    }
    
    function split(signal: Complex[]): Complex[] {
        const even = signal.filter((_, i) => i % 2 === 0);
        const odd = signal.filter((_, i) => i % 2 === 1);
        return butterfly(fft(even), fft(odd));
    }

    if (signal.length > 2) {
        return split(signal);
    } else {
        return butterfly(
            signal.slice(0, 1),
            signal.slice(1)
        );
    }
}

function duration(callback: Function) {
    const tsStart = Date.now();
    callback();
    const tsEnd = Date.now();
    console.log(tsEnd - tsStart);
}

const signal: Complex[] = Array.from({ length: 4096 }, (_, i) => i % 2 === 0 ? 1 : 0).map(i => new Complex(i, 0));

duration(() => dft(signal));
duration(() => fft(signal));

// const signal2: Complex[] = [1, 0, 1, 0, 1, 0, 1, 0].map(i => new Complex(i, 0));
// console.log(dft(signal2));