/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        //最终得分节点
        finalScore: cc.Node,

        //得分节点
        scoreNode: cc.Node,

        //移动持续时间
        moveDuration: 3,
    },

    //移动到中心
    moveToCenter() {
        const action = cc.moveTo(this.moveDuration, cc.p(0, 0)).easing(cc.easeCubicActionIn());

        this.node.runAction(action);

        // this.node.y = 0;

        this.changeFinalScore();
    },

    //显示得分
    changeFinalScore() {
        this.finalScore.getComponent(cc.Label).string = '最终得分: ' + this.scoreNode.getComponent('Score').score;
    },

    // use this for initialization
    onLoad() {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
