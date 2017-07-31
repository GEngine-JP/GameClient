/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Basic {

	export class UISelectList extends fairygui.GComponent {

		public list:fairygui.GList;

		public static URL:string = "ui://9leh0eyfzd9g47";

		public static createInstance():UISelectList {
			return <UISelectList><any>(fairygui.UIPackage.createObject("Basic","SelectList"));
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