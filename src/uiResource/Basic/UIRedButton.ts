/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Basic {

	export class UIRedButton extends fairygui.GButton {

		public bg:fairygui.GImage;

		public static URL:string = "ui://9leh0eyfrpmb13";

		public static createInstance():UIRedButton {
			return <UIRedButton><any>(fairygui.UIPackage.createObject("Basic","RedButton"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.bg = <fairygui.GImage><any>(this.getChildAt(0));
		}
	}
}