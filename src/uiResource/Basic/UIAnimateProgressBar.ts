/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Basic {

	export class UIAnimateProgressBar extends fairygui.GProgressBar {

		public nowProgress:fairygui.GImage;

		public static URL:string = "ui://9leh0eyft9fj5b";

		public static createInstance():UIAnimateProgressBar {
			return <UIAnimateProgressBar><any>(fairygui.UIPackage.createObject("Basic","AnimateProgressBar"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.nowProgress = <fairygui.GImage><any>(this.getChildAt(1));
		}
	}
}