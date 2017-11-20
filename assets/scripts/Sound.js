cc.Class({
    extends: cc.Component,

    properties: {
        //跳跃音效资源
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },

        //得分音效资源
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    playJumpSound() {
        // 调用跳跃音效
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    playScoreAudio() {
        // 调用跳跃音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
