class Long {
	public constructor(low:number,high:number) {
		this._low = low;
		this._high = high;
	}

	private _low:number;
	private _high:number;
	public static readonly Zero:Long = new Long(0,0);

	public toString():string{
		return this._low + "_" + this._high;
	}

	public setHigh(high:number) : void
	{
		this._high = high;
	}

	public getHigh() : number
	{
		return this._high;
	}

	public setLow(low:number) : void
	{
		this._low = low;
	}

	public getLow() : number
	{
		return this._low;
	}

	public equals(long:Long):boolean{
		if(long == null){
			if(this.isZero())
				return true;
			else
				return false;
		}
		return this._low == long.getLow() && this._high == long.getHigh();
	}

	public isZero():boolean{
		return this._high == 0 && this._low == 0;
	}


	public static readLong(input:egret.ByteArray) : Long
	{
		var _loc_1:number = input.readUnsignedByte() << 24;
		_loc_1 = _loc_1 | input.readUnsignedByte() << 16;
		_loc_1 = _loc_1 | input.readUnsignedByte() << 8;
		_loc_1 = _loc_1 | input.readUnsignedByte();
		var _loc_2:number = input.readUnsignedByte() << 24;
		_loc_2 = _loc_2 | input.readUnsignedByte() << 16;
		_loc_2 = _loc_2 | input.readUnsignedByte() << 8;
		_loc_2 = _loc_2 | input.readUnsignedByte();
		return new Long(_loc_1,_loc_2);
	}

	public static writeLong(value:Long,output:egret.ByteArray) : void
	{
		if(value == null)
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


	public toNumber() : number
	{
		let _loc_1:number = this._high & 2147483648;
		if (_loc_1 > 0)
		{
			return (-((4294967295 + 1) - this._high)) * (4294967295 + 1) - this._low;
		}
		return (this._high * (4294967295 + 1)) + this._low;
	}
}