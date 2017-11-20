/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        //星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0
    },

    getPlayerDistance() {
        //根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        //根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist; 
    },

    onPicked() {
        //得分
        this.game.gainScore();
        //当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        //回收当前资源
        this.game.starPool.put(this.node);
    },

    onLoad() {

    },

    update(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }

        //根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});
