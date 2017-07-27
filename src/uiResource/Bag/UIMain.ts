/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module info.xiaomo.client.Bag {

	export class UIMain extends fairygui.GComponent {

		public list:fairygui.GList;

		public static URL:string = "gameUI://r5x6wd5vjh150";

		public static createInstance():UIMain {
			return <UIMain><any>(fairygui.UIPackage.createObject("Bag","Main"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.list = <fairygui.GList><any>(this.getChildAt(1));
		}
	}
}