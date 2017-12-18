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

        scoreNode: cc.Node,
    },

    downNewClock() {
        const score = this.scoreNode.score;

        if (score > 0 && score <= 20) {
            if (this.duration % 10 == 0) {
                this.collectionGroup.getComponent('CollectionGroup').spawnNewClock();
            }
        }

        if (score > 20 && score <= 40) {
            if (this.duration % 12 == 0) {
                this.collectionGroup.getComponent('CollectionGroup').spawnNewClock();
            }
        }

        if (score > 40 && score <= 60) {
            if (this.duration % 15 == 0) {
                this.collectionGroup.getComponent('CollectionGroup').spawnNewClock();
            }
        }

        if (score > 60) {
            if (this.duration % 20 == 0) {
                this.collectionGroup.getComponent('CollectionGroup').spawnNewClock();
            }
        }
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

            this.downNewClock();
        }    

        this.schedule(this.callBack, 1);
    },

    addMoreDuration(time = 10) {
        this.sound.getComponent('Sound').playClockAudio();        
        this.duration += time;
    },

    onLoad () {
        this.game = this.game.getComponent('Game');
        this.scoreNode = this.scoreNode.getComponent('Score');
    },

    start () {
        this.node.getComponent(cc.Label).string = `倒计时：${this.duration}S`;

        this.upString();
    },

    update (dt) {
        
    },
});
