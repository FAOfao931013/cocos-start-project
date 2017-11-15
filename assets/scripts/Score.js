/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        //得分音效资源
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    init(game) {
        this.game = game;
    },

    gainScore() {
        this.score += 1;
        //获得自身的Label组件
        this.node.getComponent(cc.Label).string = 'Score: ' + this.score;
        //播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);

        return this.score;
    },

    // use this for initialization
    onLoad() {
        this.score = 0;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
