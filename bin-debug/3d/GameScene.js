var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GameScene = (function () {
    function GameScene(context3d) {
        var view = new egret3d.View3D(0, (context3d.height - context3d.width) / 2, context3d.width, context3d.width);
        view.camera3D.lookAt(new egret3d.Vector3D(0, 1000, -1000), new egret3d.Vector3D(0, 0, 0));
        view.backColor = 0xff181818;
        context3d.addView3D(view);
        this.view = view;
        this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        this.cameraCtl.lookAtObject.y = 100;
        this.cameraCtl.distance = 500;
        this.cameraCtl.rotationX = 30;
        this.cameraCtl.rotationY = 180;
        context3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }
    GameScene.prototype.createGameScene = function () {
        var texture = RES.getRes("3d/background.jpg");
        console.log(texture);
        this.view.backImage = texture;
        var geo = RES.getRes("3d/0_Model/Esm/Zhouyu.esm");
        var clip = RES.getRes("3d/0_Model/Eam/attack.eam");
        var idleClip = RES.getRes("3d/0_Model/Eam/idle.eam");
        var tex = RES.getRes("3d/0_Model/Texture/hero_01.png");
        clip.animationName = "attack";
        idleClip.animationName = "idle";
        var mesh = new egret3d.Mesh(geo);
        this.mesh = mesh;
        clip.isLoop = false;
        idleClip.isLoop = true;
        mesh.material.diffuseTexture = tex;
        mesh.material.ambientColor = 0xb4b4b4;
        mesh.material.gloss = 10;
        mesh.material.specularLevel = 0.5;
        var skeletonController = mesh.animation.skeletonAnimationController;
        skeletonController.addSkeletonAnimationClip(clip);
        skeletonController.addSkeletonAnimationClip(idleClip);
        skeletonController.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.onAnimationComplete, this);
        skeletonController.addEventListener(egret3d.AnimationEvent3D.CYCLE, this.onAnimationCycle, this);
        this.view.addChild3D(mesh);
        mesh.animation.play(idleClip.animationName);
        this.lightGroup = new egret3d.LightGroup();
        var dirLight = new egret3d.DirectLight(new egret3d.Vector3D(1, -1, 0));
        this.lightGroup.addLight(dirLight);
        mesh.lightGroup = this.lightGroup;
        // egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    };
    GameScene.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                this.mesh.animation.play("attack");
                break;
        }
    };
    GameScene.prototype.onAnimationComplete = function (e) {
        console.log("onAnimationComplete");
        this.mesh.animation.play("idle");
    };
    GameScene.prototype.onAnimationCycle = function (e) {
        console.log("播放完成一个循环");
    };
    GameScene.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return GameScene;
}());
__reflect(GameScene.prototype, "GameScene");
