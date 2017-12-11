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

        //星星产生后的消失时间
        maxStarDuration: 0,

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
    },

    gameOver() {
        //停止 player 节点所有活动并隐藏
        this.player.stopAllActions(); 
        this.player.getComponent('Player').removeKeyboardListener();
        this.player.getComponent('Player').hide();

        //游戏结束标识
        this.over = true;
        
        this.scoreboard.getComponent('Final').moveToCenter();
        this.collectionGroup.getComponent('CollectionGroup').putBackStar();
        
    },

    restart() {
        cc.director.loadScene('start');
    },

    onLoad() {
        this.collectionGroup.getComponent('CollectionGroup').spawnNewStar();

        this.collectionGroup.getComponent('CollectionGroup').spawnNewClock();            
    },

    start() {
        //初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        this.over = false;
    },

    update(dt) {
        //防止重复失败
        if (this.over) {
            return;
        }
    },
});
