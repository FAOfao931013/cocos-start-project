/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        duration: {
            default: 60,
            type: cc.Integer
        },

        game: cc.Node
    },

    upString() {
        this.callBack = function () {
            if (this.duration == 0) {
                this.unschedule(this.callBack);

                this.game.gameOver();
                return;
            }

            this.duration -= 1;
            this.node.getComponent(cc.Label).string = `倒计时：${this.duration}S`;
        }

        this.schedule(this.callBack, 1);
    },

    addMoreDuration(time = 10) {
        this.duration += time;
    },

    onLoad () {
        this.game = this.game.getComponent('Game');
    },

    start () {
        this.node.getComponent(cc.Label).string = `倒计时：${this.duration}S`;

        this.upString();
    },

    update (dt) {
        
    },
});
