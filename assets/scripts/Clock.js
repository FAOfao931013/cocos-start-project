/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,

        //加速度
        accel: 0,

        //增加的时间
        time: 0,
    },

    backNode() {
        //回收当前资源
        this.collectionGroup.putBackClock(this.node);
    },

    getPlayerDistance() {
        //根据 player 节点位置判断距离
        var playerPos = this.collectionGroup.player.getPosition();
        //根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked() {
        this.backNode();

        this.collectionGroup.countdown.addMoreDuration();
    },

    onLoad () {

    },

    start () {
        
    },

    update (dt) {
        this.node.y -= this.accel * dt * dt * 10 / 2;
        this.accel = this.accel + 5;

        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }

        if (this.node.y < -this.collectionGroup.canvas.height / 2) {
            this.backNode();
        }
    },
});
