/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        //星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0
    },

    getPlayerDistance() {
        //根据 player 节点位置判断距离
        const playerPos = this.collectionGroup.player.getPosition();
        //根据两点位置计算两点之间距离
        const dist = cc.pDistance(this.node.position, playerPos);
        return dist; 
    },

    onPicked() {
        //得分
        this.collectionGroup.gainScore();
        this.backNode();
        //当星星被收集时，生成一个新的星星
        this.collectionGroup.spawnNewStar();
    },

    backNode() {
        //回收当前资源
        this.collectionGroup.putBackStar(this.node);
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
