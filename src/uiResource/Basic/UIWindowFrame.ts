/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Basic {

	export class UIWindowFrame extends fairygui.GLabel {

		public dragArea:fairygui.GGraph;
		public closeButton:fairygui.GButton;

		public static URL:string = "ui://9leh0eyfniii7d";

		public static createInstance():UIWindowFrame {
			return <UIWindowFrame><any>(fairygui.UIPackage.createObject("Basic","WindowFrame"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.dragArea = <fairygui.GGraph><any>(this.getChildAt(1));
			this.closeButton = <fairygui.GButton><any>(this.getChildAt(2));
		}
	}
}