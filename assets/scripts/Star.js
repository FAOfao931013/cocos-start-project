/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        //星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0
    },

    getPlayerDistance() {
        //根据 player 节点位置判断距离
        var playerPos = this.collectionGroup.player.getPosition();
        //根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist; 
    },

    onPicked() {
        //得分
        this.collectionGroup.gainScore();
        //回收当前资源
        this.collectionGroup.putBackStar(this.node);
        //当星星被收集时，生成一个新的星星
        this.collectionGroup.spawnNewStar();
    },

    onLoad() {

    },

    update(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
    },
});
