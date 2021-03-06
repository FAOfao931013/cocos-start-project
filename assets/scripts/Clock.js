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
        const playerPos = this.collectionGroup.player.getPosition();
        //根据两点位置计算两点之间距离
        const dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked() {
        this.backNode();

        this.collectionGroup.countdown.addMoreDuration(this.time);
    },

    onLoad () {

    },

    update (dt) {
        this.node.y -= this.accel * dt * dt * 10 / 2;
        this.accel = this.accel + 1;

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
