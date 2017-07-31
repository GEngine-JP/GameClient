/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Basic {

	export class UIGridItem extends fairygui.GButton {

		public t0:fairygui.GTextField;
		public t1:fairygui.GTextField;
		public t2:fairygui.GTextField;
		public star:fairygui.GProgressBar;

		public static URL:string = "ui://9leh0eyfrwlc7k";

		public static createInstance():UIGridItem {
			return <UIGridItem><any>(fairygui.UIPackage.createObject("Basic","GridItem"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.t0 = <fairygui.GTextField><any>(this.getChildAt(2));
			this.t1 = <fairygui.GTextField><any>(this.getChildAt(4));
			this.t2 = <fairygui.GTextField><any>(this.getChildAt(5));
			this.star = <fairygui.GProgressBar><any>(this.getChildAt(6));
		}
	}
}