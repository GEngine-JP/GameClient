/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module Login {

	export class UILoginMain extends fairygui.GComponent {

		public loginLabel:fairygui.GTextField;
		public loginButton:fairygui.GButton;
		public loginName:fairygui.GTextField;
		public cancelButton:fairygui.GButton;

		public static URL:string = "gameUI://ed3tkcfkg0gd0";

		public static createInstance():UILoginMain {
			return <UILoginMain><any>(fairygui.UIPackage.createObject("Login","LoginMain"));
		}

		public constructor() {
			super();
		}

		protected constructFromXML(xml: any): void {
			super.constructFromXML(xml);

			this.loginLabel = <fairygui.GTextField><any>(this.getChildAt(1));
			this.loginButton = <fairygui.GButton><any>(this.getChildAt(2));
			this.loginName = <fairygui.GTextField><any>(this.getChildAt(3));
			this.cancelButton = <fairygui.GButton><any>(this.getChildAt(4));
		}
	}
}