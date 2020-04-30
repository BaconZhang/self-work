const fix = (target: number, fix: number) => Math.round(target * 10 ** fix) / 10 ** fix;

export default class Complex {
    private r: number;
    private i: number;
    /**
     * 复数
     * @param r 实部
     * @param i 虚部
     */
    constructor(r: number, i: number) {
        this.r = r;
        this.i = i;
    }

    mul(complex: Complex) {
        const a = this.r;
        const b = this.i;
        const c = complex.r;
        const d = complex.i;
        const r = a * c - b * d;
        const i = b * c + a * d;
        return new Complex(r, i);
    }

    div(complex: Complex) {
        const a = this.r;
        const b = this.i;
        const c = complex.r;
        const d = complex.i;
        const p = c ** 2 + d ** 2;
        if (p === 0) {
            throw new Error("不符合复数除法规则");
        }
        const r = (a * c + b * d) / p;
        const i = (b * c - a * d) / p;
        return new Complex(r, i);
    }

    add(complex: Complex) {
        return new Complex(this.r + complex.r, this.i + complex.i);
    }

    fix(p: number = 4) {
        return new Complex(fix(this.r, p), fix(this.i, p));
    }
}

