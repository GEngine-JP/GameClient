class LevelRequire {
	public requireElement:LevelRequireElement[];

	public constructor() 
	{
		this.requireElement = [];
	}

	/**
	 * 获取通关需要的数量
	 */
	public getLevelRequireNumber():number
	{
		return this.requireElement.length;
	}

	/**
	 * 添加游戏对象
	 */
	public addElement(type:string ,num:number)
	{
		var element:LevelRequireElement = new LevelRequireElement(type,num);
		this.requireElement.push(element);
	}


	public openChange()
	{
		this.requireElement = [];
	}


	/**
	 * 改变所需要的数量
	 */
	public changeRequireNum(type:string, num:number)
	{
		var count :number = this.getLevelRequireNumber();

		for (var i = 0 ; i < count ; i ++) 
		{
			var ele: LevelRequireElement = this.requireElement[i];
			if( ele.type == type)
			{
				ele.num -=1;
				return;
			}
		}
	}


	/**
	 * 是否通关
	 */
	public isClear():boolean
	{
		var count :number = this.getLevelRequireNumber();
			for (var i = 0 ; i < count ; i ++) 
		{
			var ele: LevelRequireElement = this.requireElement[i];
			if( ele.num > 0)
			{
				return false;
			}
		}
		return true;
	}
	

}