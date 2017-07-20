class GamaData {
	public static unMapNum : number = 0; // 没有使用过的地图数据
	public static mapData : number[][]; // 地图数据
	public static stepNum : number = 0; // 我的步数
	public static levelStepNum : number = 0; // 关卡步数
	public static elementTypes : number[]; // 元素类型
	public static levelRequire: LevelRequire; // 一个实例
	public static elements : GameElement[]; // 游戏对象池
	public static unUsedElement : number[]; // 未使用的id
	public static levelBgName : string = "";// 图片名字
	public static maxRow : number = 8;
	public static maxColum : number = 8;
	public static currentEleNum : number = 0;

	public static stageW : number = 0;
	public static stageH : number = 0;

	public static initData()
	{
		this.initMapData();
		this.levelRequire = new LevelRequire();
		this.elements = [];
		this.initUnUsedElement();
		this.stageH = egret.MainContext.instance.stage.stageHeight;
		this.stageH = egret.MainContext.instance.stage.stageWidth;
	}


	private static initMapData()
	{
		this.mapData = [];
		for( var i = 0; i < this.maxRow; i++)
		{
			var arr: number [] = [];
			for ( var j = 0 ;j < this.maxColum ; j++)
			{
				this.mapData[j].push(-2);
			}

		}
	}

	private static initUnUsedElement()
	{
		this.unUsedElement = [];
		for ( var i = 0 ;i < this.maxRow * this.maxColum ; i++)
			{
				var ele:GameElement = new GameElement();
				ele.id = i;
				this.elements.push(ele);
				this.unUsedElement.push(i);
			}
	}
}