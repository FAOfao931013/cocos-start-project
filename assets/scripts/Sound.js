/*eslint-disable */
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

        //加时器音效资源
        clockAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    playJumpSound() {
        // 调用跳跃音效
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    playScoreAudio() {
        // 调用得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    playClockAudio() {
        // 调用加时器音效
        cc.audioEngine.playEffect(this.clockAudio, false);
    },

    onLoad() {

    },

    // update(dt) {

    // },
});
