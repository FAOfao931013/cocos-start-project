/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        duration: {
            default: 60,
            type: cc.Integer
        },
    },

    onLoad () {},

    start () {
        this.node.getComponent(cc.Label).string = `倒计时：${this.duration}S`;

        this.upString();
    },

    upString() {
        this.callBack = function () {
            if (this.duration == 0) {
                this.unschedule(this.callBack);
                return;
            }

            this.duration -= 1;
            this.node.getComponent(cc.Label).string = `倒计时：${this.duration}S`;
        }

        this.schedule(this.callBack, 1);
    },

    addMoreDuration(time) {
        this.duration += time;
    },

    update (dt) {
        
    },
});
