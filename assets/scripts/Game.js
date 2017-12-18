/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        //这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },

        //这个属性引用了礼物预制资源
        giftPrefab: {
            default: null,
            type: cc.Prefab
        },

        //player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },

        //canvas根节点
        canvas: cc.Node,

        //分数节点
        scoreNode: cc.Node,

        //得分面板节点
        scoreboard: cc.Node,

        collectionGroup: cc.Node,

        //倒计时节点
        countdown: cc.Node,
    },

    gameOver() {
        //停止 player 节点所有活动并隐藏
        this.player.stopAllActions(); 
        this.player.getComponent('Player').removeKeyboardListener();
        this.player.getComponent('Player').hide();
        
        this.scoreboard.getComponent('Final').moveToCenter();
        this.collectionGroup.getComponent('CollectionGroup').putBackStar();
    },

    restart() {
        cc.director.loadScene('start');
    },

    onLoad() {
        this.countdown = this.countdown.getComponent('Countdown');
    },

    start() {
        this.collectionGroup.getComponent('CollectionGroup').spawnNewStar();
    },

    update(dt) {

    },
});
