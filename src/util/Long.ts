class Long {

    private low: number;
    private high: number;
    public static readonly Zero: Long = new Long(0, 0);

    /**
     * 构造函数
     * @param {number} low
     * @param {number} high
     */
    public constructor(low: number, high: number) {
        this.low = low;
        this.high = high;
    }


    /**
     * 是否为0
     * @returns {boolean}
     */
    public isZero(): boolean {
        return this.high == 0 && this.low == 0;
    }


    /**
     * readLong
     * @param {egret.ByteArray} input
     * @returns {Long}
     */
    public static readLong(input: egret.ByteArray): Long {
        let loc1: number = input.readUnsignedByte() << 24;
        loc1 = loc1 | input.readUnsignedByte() << 16;
        loc1 = loc1 | input.readUnsignedByte() << 8;
        loc1 = loc1 | input.readUnsignedByte();
        let loc2: number = input.readUnsignedByte() << 24;
        loc2 = loc2 | input.readUnsignedByte() << 16;
        loc2 = loc2 | input.readUnsignedByte() << 8;
        loc2 = loc2 | input.readUnsignedByte();
        return new Long(loc1, loc2);
    }


    /**
     * writeLong
     * @param {Long} value
     * @param {egret.ByteArray} output
     */
    public static writeLong(value: Long, output: egret.ByteArray): void {
        if (value == null)
            value = Long.Zero;
        output.writeByte(value.getHigh() >>> 24);
        output.writeByte(value.getHigh() >>> 16);
        output.writeByte(value.getHigh() >>> 8);
        output.writeByte(value.getHigh());
        output.writeByte(value.getLow() >>> 24);
        output.writeByte(value.getLow() >>> 16);
        output.writeByte(value.getLow() >>> 8);
        output.writeByte(value.getLow());
    }


    /**
     * toNumber
     * @returns {number}
     */
    public toNumber(): number {
        let loc1: number = this.high & 2147483648;
        if (loc1 > 0) {
            return (-((4294967295 + 1) - this.high)) * (4294967295 + 1) - this.low;
        }
        return (this.high * (4294967295 + 1)) + this.low;
    }

    public toString(): string {
        return this.low + "_" + this.high;
    }

    public setHigh(high: number): void {
        this.high = high;
    }

    public getHigh(): number {
        return this.high;
    }

    public setLow(low: number): void {
        this.low = low;
    }

    public getLow(): number {
        return this.low;
    }

    public equals(long: Long): boolean {
        if (long == null) {
            return this.isZero();
        }
        return this.low == long.getLow() && this.high == long.getHigh();
    }
}