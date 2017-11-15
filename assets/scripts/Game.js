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
        canvas: {
            default: null,
            type: cc.Node
        },

        //得分文字节点
        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        //得分音效资源
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },

        //分数节点
        scoreNode: {
            default: null,
            type: cc.Node,
        }
    },

    spawnNewStar: function () {
        //使用给定的模板生成对象池并使用
        this.starPool = new cc.NodePool();

        let star = cc.instantiate(this.starPrefab);

        this.starPool.put(star);
        
        let newStar;
        
        if (this.starPool.size() > 0) {
            newStar = this.starPool.get();
        } else {
            newStar = cc.instantiate(this.starPrefab);
        }

        this.newStar = newStar;

        //将新增的节点添加到 Canvas 节点下面
        this.canvas.addChild(newStar);
        //为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        //将 Game 组件的实例传入星星组件
        newStar.getComponent('Star').game = this;

        //重置计时器，根据得分越高消失的越快
        this.starDuration = this.maxStarDuration - this.score / 10;
        if (this.starDuration < 2) {
            this.starDuration = 2;
        }
        this.timer = 0;
    },

    getNewStarPosition: function () {
        var randX = 0;
        //根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = (Math.random() * 1 + 1) * this.player.getComponent('Player').jumpHeight / 2 + this.player.getComponent('Player').beginY;
        //根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.canvas.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        //返回星星坐标
        return cc.p(randX, randY);
    },

    gainScore: function () {
        this.score = this.scoreNode.gainScore();
        //得分后回收对象
        this.starPool.put(this.newStar);
    },

    gameOver: function () {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    },

    onLoad: function () {
        //初始化计时器
        this.timer = 0;
        this.starDuration = 0;

        //初始化分数
        this.score = 0;

        //生成一个新的星星
        this.spawnNewStar();

        //初始化得分节点
        this.scoreNode = this.scoreNode.getComponent('Score');
        this.scoreNode.init(this);
    },

    update: function (dt) {
        //每帧更新计时器，超过限度还没有生成新的星星
        //就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
});
