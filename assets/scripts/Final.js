/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        //最终得分节点
        finalScore: cc.Node,

        //得分节点
        scoreNode: cc.Node,

        //礼物文字提示节点
        giftTip: cc.Node,

        //移动持续时间
        moveDuration: 3,
    },

    //生成礼物处理函数
    gitfHandler() {
        const score = this.scoreNode.score;

        if (score == 0) {
            this.giftTip.getComponent(cc.Label).string = '好可惜你没有得分，礼物没法和你见面，再玩一次吧~'
        }

        if (score > 0 && score <= 20) {
            this.giftTip.getComponent(cc.Label).string = '恭喜你获得1份礼物！';
        }

        if (score > 20 && score <= 40) {
            this.giftTip.getComponent(cc.Label).string = '恭喜你获得2份礼物！';
        }

        if (score > 40) {
            this.giftTip.getComponent(cc.Label).string = '恭喜你获得3份礼物！';
        }
    },

    //移动到中心
    moveToCenter() {
        const action = cc.moveTo(this.moveDuration, cc.p(0, 0)).easing(cc.easeCubicActionIn());

        this.node.runAction(action);

        this.changeFinalScore();

        setTimeout(() => {
            this.gitfHandler();
        }, this.moveDuration);
    },

    //显示得分
    changeFinalScore() {
        this.finalScore.getComponent(cc.Label).string = '最终得分: ' + this.scoreNode.score;
    },

    onLoad() {
        this.scoreNode = this.scoreNode.getComponent('Score');
    },

    // update(dt) {

    // },
});
