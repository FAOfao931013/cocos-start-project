/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        //音效节点
        sound: cc.Node,
    },

    init(game) {
        this.game = game;
    },

    gainScore() {
        this.score += 1;
        //获得自身的Label组件
        this.node.getComponent(cc.Label).string = 'Score: ' + this.score;
        //播放得分音效
        this.playScoreAudio();

        return this.score;
    },

    playScoreAudio() {
        this.sound.getComponent('Sound').playScoreAudio();
    },

    // use this for initialization
    onLoad() {
        this.score = 0;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
