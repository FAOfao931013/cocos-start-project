/*eslint-disable */
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        G.common = this;
    },

    initPool(that, objInfo) {
        const poolName = objInfo.name + 'Pool';
        
        that[poolName] = new cc.NodePool();

        for (let i = 0; i < objInfo.poolAmount; i++) {
            let newPrefab = cc.instantiate(objInfo.prefab);
            that[poolName].put(newPrefab);
        }
    },

    spawnNewNode(pool, prefab, nodeParent) {
        let newNode;

        if (pool.size() > 0) {
            newNode = pool.get();
        } else {
            newNode = cc.instantiate(prefab);
        }

        nodeParent.addChild(newNode);

        return newNode;
    },

    putBackNode(that, node) {
        const poolName = node.name + "Pool";
        that[poolName].put(node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
