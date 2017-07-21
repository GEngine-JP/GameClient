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


}