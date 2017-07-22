// TypeScript file


class GameUtil extends egret.EventDispatcher {
    images: { [url: string]: egret.BitmapData } = {};
    private resCount = 0;

    /**
     * 加载图片
     * @param {string[]} urls
     */
    loadImages(urls: string[]) {
        this.resCount = urls.length;
        urls.forEach(url => {
            const loader = new egret.ImageLoader();
            const finishHandler = e => {
                this.images[url] = loader.data;
                if (this.resCount == Object.keys(this.images).length)
                    this.dispatchEventWith(egret.Event.COMPLETE)
            };
            loader.once(egret.Event.COMPLETE, finishHandler, this);
            loader.once(egret.IOErrorEvent.IO_ERROR, finishHandler, this);
            loader.load(url);
        });
    }


        /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}