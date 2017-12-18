/*eslint-disable */
const star = cc.Class({
    name: 'star',
    properties: {
        name: 'star',
        prefab: cc.Prefab,
        poolAmount: 0,
        duration: 0,
    }
});

const clock = cc.Class({
    name: 'clock',
    properties: {
        name: 'clock',
        prefab: cc.Prefab,
        poolAmount: 0,
        duration: 0,
    }
});

cc.Class({
    extends: cc.Component,

    properties: () => ({
        canvas: cc.Node,

        player: cc.Node,

        scoreNode: cc.Node,

        countdown: cc.Node,

        star: {
            default: null,
            type: star,
        },

        clock: {
            default: null,
            type: clock,
        },
    }),

    gainScore() {
        this.scoreNode.gainScore();
    },

    spawnCollection(collectionInfo) {
        const pool = collectionInfo.name + 'Pool';

        let newNode = G.common.spawnNewNode(this[pool], collectionInfo.prefab, this.canvas);

        return newNode;
    },

    spawnNewStar() {
        const newStar = this.spawnCollection(this.star);

        //为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition(newStar));

        newStar.getComponent('Star').collectionGroup = this;

        this.newStar = newStar;
    },

    getNewStarPosition(newStar) {
        var randX = 0;
        //根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = (Math.random() + 1) * this.player.getComponent('Player').jumpHeight / 2 + this.player.getComponent('Player').beginY;
        //根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.canvas.width / 2 - 40;
        randX = cc.randomMinus1To1() * maxX;
        //防止下一颗生成的星星离玩家过近
        if (Math.abs(randX - this.player.x) < newStar.getComponent('Star').pickRadius) {
            if (randX < 0) {
                randX -= 50;
            } else {
                randX += 50;
            }
        }
        //返回星星坐标
        return cc.p(randX, randY);
    },

    putBackStar(node = this.newStar) {
        G.common.putBackNode(this, node);
    },

    putBackClock(node = this.newClock) {
        G.common.putBackNode(this, node);
    },

    spawnNewClock() {
        const newClock = this.spawnCollection(this.clock);
        
        const y = this.canvas.height / 2;

        const x = cc.randomMinus1To1() * (this.canvas.width / 2 - newClock.width / 2);

        newClock.setPosition(cc.p(x, y));

        newClock.getComponent('Clock').collectionGroup = this;

        this.newClock = newClock;
    },

    onLoad() {
        G.common.initPool(this, this.star);
        G.common.initPool(this, this.clock);

        this.scoreNode = this.scoreNode.getComponent('Score');
        this.countdown = this.countdown.getComponent('Countdown');
    },

    // update(dt) {

    // },
});
