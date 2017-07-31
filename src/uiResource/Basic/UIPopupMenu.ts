/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Basic {

	export class UIPopupMenu extends fairygui.GComponent {

		public list:fairygui.GList;

		public static URL:string = "ui://9leh0eyfl6f46x";

		public static createInstance():UIPopupMenu {
			return <UIPopupMenu><any>(fairygui.UIPackage.createObject("Basic","PopupMenu"));
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