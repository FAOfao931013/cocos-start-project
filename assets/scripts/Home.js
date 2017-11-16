cc.Class({
    extends: cc.Component,

    properties: {
        explainWrap: cc.Node,
    },

    startGame() {
        cc.director.loadScene('game');
    },

    showExplain() {
        this.explainWrap.active = true;
    },

    closeExplain() {
        this.explainWrap.active = false;
    },

    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
