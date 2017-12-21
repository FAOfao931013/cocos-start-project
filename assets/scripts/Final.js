/*eslint-disable */
const gifts1 = ['亲一下~','零食一份~','冰淇淋一个~','奶茶一杯~','现金红包10元~','给你卖萌一下~'];
const gifts2 = ['豪华酒店住一晚~','看任意电影两场~','现金红包50元~','自选零食5份~','自驾游外出~'];
const gifts3 = ['购物车自选买单一样~','现金红包一个（金额你挑哟~）','任选香水一瓶','高级餐厅餐券一张~','戴森吹风机一个~'];

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

    getArrCount(arr, count) {
        let result = [];
        let i = 0;

        while (i < count) {
            let num = Math.floor(Math.random() * arr.length);

            if (!result.includes(arr[num])) {
                result.push(arr[num]);
                i++;
            }

            if (i == count) {
                return result;
            }
        }
    },

    //打开礼物1
    openGift1() {
        cc.find('gifts/gift1', this.node).active = false;
        cc.find('giftText/text1', this.node).getComponent(cc.Label).string = this.giftsArr[0];
    },

    //打开礼物2
    openGift2() {
        cc.find('gifts/gift2', this.node).active = false;
        cc.find('giftText/text2', this.node).getComponent(cc.Label).string = this.giftsArr[1];        
    },

    //打开礼物3
    openGift3() {
        cc.find('gifts/gift3', this.node).active = false;
        cc.find('giftText/text3', this.node).getComponent(cc.Label).string = this.giftsArr[2];        
    },

    //生成礼物处理函数
    gitfHandler() {
        const score = this.scoreNode.score;
        let result;
        
        if (score == 0) {
            this.giftTip.getComponent(cc.Label).string = '没有得分，就没有礼物哟~';
            this.node.getChildByName('gifts').active = false;
        }

        if (score > 0 && score <= 20) {
            result = this.getArrCount(gifts1, 3);
        }

        if (score > 20 && score <= 40) {
            const res1 = this.getArrCount(gifts1, 2);
            const res2 = this.getArrCount(gifts2, 1);
            
            result = [...res1, ...res2];
        }

        if (score > 40 && score < 60) {
            const res1 = this.getArrCount(gifts1, 1);
            const res2 = this.getArrCount(gifts2, 2);

            result = [...res1, ...res2];
        }

        if (score > 60 && score < 80) {
            const res1 = this.getArrCount(gifts2, 2);
            const res2 = this.getArrCount(gifts3, 1);

            result = [...res1, ...res2];
        }

        if (score > 80 && score < 100) {
            const res1 = this.getArrCount(gifts2, 1);
            const res2 = this.getArrCount(gifts3, 2);

            result = [...res1, ...res2];
        }

        if (score > 100) {
            result = this.getArrCount(gifts3, 3);
        }

        this.giftsArr = result;
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
