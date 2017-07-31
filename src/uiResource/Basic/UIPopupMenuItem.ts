/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Basic {

	export class UIPopupMenuItem extends fairygui.GButton {

		public checked:fairygui.Controller;

		public static URL:string = "ui://9leh0eyfl6f46z";

		public static createInstance():UIPopupMenuItem {
			return <UIPopupMenuItem><any>(fairygui.UIPackage.createObject("Basic","PopupMenuItem"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.checked = this.getControllerAt(1);
		}
	}
}