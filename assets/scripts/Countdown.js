/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {
        duration: {
            default: 60,
            type: cc.Integer,
        },

        game: cc.Node,

        sound: cc.Node,

        collectionGroup: cc.Node,
    },

    upString() {
        this.callBack = function () {
            this.duration -= 1;
            this.node.getComponent(cc.Label).string = `倒计时：${this.duration}S`;

            if (this.duration == 0) {
                this.unschedule(this.callBack);

                this.game.gameOver();
                return;
            }

            if (this.duration % 5 == 0) {
                this.collectionGroup.getComponent('CollectionGroup').spawnNewClock();
            }
        }    

        this.schedule(this.callBack, 1);
    },

    addMoreDuration(time = 10) {
        this.sound.getComponent('Sound').playClockAudio();        
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
