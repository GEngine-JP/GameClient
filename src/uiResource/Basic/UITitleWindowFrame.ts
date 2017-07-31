/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Basic {

	export class UITitleWindowFrame extends fairygui.GLabel {

		public closeButton:fairygui.GButton;
		public dragArea:fairygui.GGraph;
		public contentArea:fairygui.GGraph;

		public static URL:string = "ui://9leh0eyfrt103l";

		public static createInstance():UITitleWindowFrame {
			return <UITitleWindowFrame><any>(fairygui.UIPackage.createObject("Basic","TitleWindowFrame"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.closeButton = <fairygui.GButton><any>(this.getChildAt(1));
			this.dragArea = <fairygui.GGraph><any>(this.getChildAt(2));
			this.contentArea = <fairygui.GGraph><any>(this.getChildAt(4));
		}
	}
}