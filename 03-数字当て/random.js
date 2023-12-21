// jsには再現性のある乱数がないらしいので、自作した
class Random {
    constructor(seed) {
        this.x = 432153253;
        this.y = 543254325;
        this.z = 865484646;
        this.w = seed;
    }

    next() {
        const t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }

    nextInt(min, max) {
        const r = Math.abs(this.next());
        return min + (r % (max + 1 - min));
    }
}

export default Random;