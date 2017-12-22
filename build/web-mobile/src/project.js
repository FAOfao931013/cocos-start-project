require=function t(o,e,c){function n(s,a){if(!e[s]){if(!o[s]){var r="function"==typeof require&&require;if(!a&&r)return r(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var p=e[s]={exports:{}};o[s][0].call(p.exports,function(t){var e=o[s][1][t];return n(e||t)},p,p.exports,t,o,e,c)}return e[s].exports}for(var i="function"==typeof require&&require,s=0;s<c.length;s++)n(c[s]);return n}({Clock:[function(t,o,e){"use strict";cc._RF.push(o,"cd55bwO3v1PtrYgmoQHVEd1","Clock"),cc.Class({extends:cc.Component,properties:{pickRadius:0,accel:0,time:0},backNode:function(){this.collectionGroup.putBackClock(this.node)},getPlayerDistance:function(){var t=this.collectionGroup.player.getPosition();return cc.pDistance(this.node.position,t)},onPicked:function(){this.backNode(),this.collectionGroup.countdown.addMoreDuration(this.time)},onLoad:function(){},update:function(t){this.node.y-=this.accel*t*t*10/2,this.accel=this.accel+3,this.getPlayerDistance()<this.pickRadius?this.onPicked():this.node.y<-this.collectionGroup.canvas.height/2&&this.backNode()}}),cc._RF.pop()},{}],CollectionGroup:[function(t,o,e){"use strict";cc._RF.push(o,"250a0uCboNJra5pGDLVtPe6","CollectionGroup");var c=cc.Class({name:"star",properties:{name:"star",prefab:cc.Prefab,poolAmount:0,duration:0}}),n=cc.Class({name:"clock",properties:{name:"clock",prefab:cc.Prefab,poolAmount:0,duration:0}});cc.Class({extends:cc.Component,properties:function(){return{canvas:cc.Node,player:cc.Node,scoreNode:cc.Node,countdown:cc.Node,star:{default:null,type:c},clock:{default:null,type:n}}},gainScore:function(){this.scoreNode.gainScore()},spawnCollection:function(t){var o=t.name+"Pool";return G.common.spawnNewNode(this[o],t.prefab,this.canvas)},spawnNewStar:function(){var t=this.spawnCollection(this.star);t.setPosition(this.getNewStarPosition(t)),t.getComponent("Star").collectionGroup=this,this.newStar=t},getNewStarPosition:function(t){var o=0,e=(Math.random()+1)*this.player.getComponent("Player").jumpHeight/2+this.player.getComponent("Player").beginY,c=this.canvas.width/2-40;return o=cc.randomMinus1To1()*c,Math.abs(o-this.player.x)<t.getComponent("Star").pickRadius&&(o<0?o-=50:o+=50),cc.p(o,e)},putBackStar:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.newStar;G.common.putBackNode(this,t)},putBackClock:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.newClock;G.common.putBackNode(this,t)},spawnNewClock:function(){var t=this.spawnCollection(this.clock),o=this.canvas.height/2,e=cc.randomMinus1To1()*(this.canvas.width/2-t.width/2);t.setPosition(cc.p(e,o)),t.getComponent("Clock").collectionGroup=this,this.newClock=t},onLoad:function(){G.common.initPool(this,this.star),G.common.initPool(this,this.clock),this.scoreNode=this.scoreNode.getComponent("Score"),this.countdown=this.countdown.getComponent("Countdown")}}),cc._RF.pop()},{}],Common:[function(t,o,e){"use strict";cc._RF.push(o,"dead3j88RxBFYP/9AvQNPDA","Common"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){G.common=this},initPool:function(t,o){var e=o.name+"Pool";t[e]=new cc.NodePool;for(var c=0;c<o.poolAmount;c++){var n=cc.instantiate(o.prefab);t[e].put(n)}},spawnNewNode:function(t,o,e){var c=void 0;return c=t.size()>0?t.get():cc.instantiate(o),e.addChild(c),c},putBackNode:function(t,o){t[o.name+"Pool"].put(o)}}),cc._RF.pop()},{}],Countdown:[function(t,o,e){"use strict";cc._RF.push(o,"8c2a9gkjRVL4r991yjdzxQG","Countdown"),cc.Class({extends:cc.Component,properties:{duration:{default:60,type:cc.Integer},game:cc.Node,sound:cc.Node,collectionGroup:cc.Node,scoreNode:cc.Node},downNewClock:function(){var t=this.scoreNode.score;t>0&&t<=20&&this.duration%10==0&&this.collectionGroup.spawnNewClock(),t>20&&t<=40&&this.duration%12==0&&this.collectionGroup.spawnNewClock(),t>40&&t<=60&&this.duration%15==0&&this.collectionGroup.spawnNewClock(),t>60&&this.duration%20==0&&this.collectionGroup.spawnNewClock()},upString:function(){this.callBack=function(){if(this.duration-=1,this.node.getComponent(cc.Label).string="倒计时："+this.duration+"S",0==this.duration)return this.unschedule(this.callBack),void this.game.gameOver();this.downNewClock()},this.schedule(this.callBack,1)},addMoreDuration:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;this.sound.playClockAudio(),this.duration+=t},onLoad:function(){this.game=this.game.getComponent("Game"),this.sound=this.sound.getComponent("Sound"),this.scoreNode=this.scoreNode.getComponent("Score"),this.collectionGroup=this.collectionGroup.getComponent("CollectionGroup")},start:function(){this.node.getComponent(cc.Label).string="倒计时："+this.duration+"S",this.upString()},update:function(t){}}),cc._RF.pop()},{}],Final:[function(t,o,e){"use strict";function c(t){if(Array.isArray(t)){for(var o=0,e=Array(t.length);o<t.length;o++)e[o]=t[o];return e}return Array.from(t)}cc._RF.push(o,"ae21fMrQU5BZoYGn+XbjZGS","Final");var n=["亲一下~","零食一份~","冰淇淋一个~","奶茶一杯~","现金红包10元~","给你卖萌一下~"],i=["豪华酒店住一晚~","看任意电影两场~","现金红包50元~","自选零食5份~","自驾游外出~"],s=["购物车自选买单一样~","现金红包一个（金额你挑哟~）","任选香水一瓶","高级餐厅餐券一张~","戴森吹风机一个~"];cc.Class({extends:cc.Component,properties:{finalScore:cc.Node,scoreNode:cc.Node,giftTip:cc.Node,moveDuration:3},getArrCount:function(t,o){for(var e=[],c=0;c<o;){var n=Math.floor(Math.random()*t.length);e.includes(t[n])||(e.push(t[n]),c++)}return e},openGift1:function(){cc.find("gifts/gift1",this.node).active=!1,cc.find("giftsText/text1",this.node).getComponent(cc.Label).string=this.giftsArr[0]},openGift2:function(){cc.find("gifts/gift2",this.node).active=!1,cc.find("giftsText/text2",this.node).getComponent(cc.Label).string=this.giftsArr[1]},openGift3:function(){cc.find("gifts/gift3",this.node).active=!1,cc.find("giftsText/text3",this.node).getComponent(cc.Label).string=this.giftsArr[2]},gitfHandler:function(){var t=this.scoreNode.score,o=void 0;if(0==t&&(this.giftTip.getComponent(cc.Label).string="没有得分，就没有礼物哟~",this.node.getChildByName("gifts").active=!1),t>0&&t<=20&&(o=this.getArrCount(n,3)),t>20&&t<=40){var e=this.getArrCount(n,2),a=this.getArrCount(i,1);o=[].concat(c(e),c(a))}if(t>40&&t<60){var r=this.getArrCount(n,1),u=this.getArrCount(i,2);o=[].concat(c(r),c(u))}if(t>60&&t<80){var p=this.getArrCount(i,2),d=this.getArrCount(s,1);o=[].concat(c(p),c(d))}if(t>80&&t<100){var h=this.getArrCount(i,1),l=this.getArrCount(s,2);o=[].concat(c(h),c(l))}t>100&&(o=this.getArrCount(s,3)),cc.find("gifts/gift1",this.node).active=!0,cc.find("gifts/gift2",this.node).active=!0,cc.find("gifts/gift3",this.node).active=!0,this.giftsArr=o},moveToCenter:function(){var t=this,o=cc.moveTo(this.moveDuration,cc.p(0,0)).easing(cc.easeCubicActionIn());this.node.runAction(o),this.changeFinalScore(),setTimeout(function(){t.gitfHandler()},this.moveDuration)},changeFinalScore:function(){this.finalScore.getComponent(cc.Label).string="收集到星星数: "+this.scoreNode.score+"颗"},onLoad:function(){this.scoreNode=this.scoreNode.getComponent("Score")}}),cc._RF.pop()},{}],Game:[function(t,o,e){"use strict";cc._RF.push(o,"61726vvoIxL7JBoHwvzti97","Game"),cc.Class({extends:cc.Component,properties:{starPrefab:{default:null,type:cc.Prefab},giftPrefab:{default:null,type:cc.Prefab},player:{default:null,type:cc.Node},canvas:cc.Node,scoreNode:cc.Node,scoreboard:cc.Node,collectionGroup:cc.Node,countdown:cc.Node},gameOver:function(){this.player.stopAllActions(),this.player.getComponent("Player").removeKeyboardListener(),this.player.getComponent("Player").hide(),this.scoreboard.getComponent("Final").moveToCenter(),this.collectionGroup.getComponent("CollectionGroup").putBackStar()},restart:function(){cc.director.loadScene("start")},onLoad:function(){this.countdown=this.countdown.getComponent("Countdown")},start:function(){this.collectionGroup.getComponent("CollectionGroup").spawnNewStar()},update:function(t){}}),cc._RF.pop()},{}],Global:[function(t,o,e){"use strict";cc._RF.push(o,"970acXI7gFGZobKmMchiMja","Global"),window.G={common:null},cc._RF.pop()},{}],Home:[function(t,o,e){"use strict";cc._RF.push(o,"fa2d16nioRClb/pKX22XCNB","Home"),cc.Class({extends:cc.Component,properties:{explainWrap:cc.Node},startGame:function(){cc.director.loadScene("game")},showExplain:function(){this.explainWrap.active=!0},closeExplain:function(){this.explainWrap.active=!1},onLoad:function(){}}),cc._RF.pop()},{}],Player:[function(t,o,e){"use strict";cc._RF.push(o,"ca57cmgA6pJG4GiMtZKDirk","Player"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,beginY:-320,canvas:{default:null,type:cc.Node},sound:cc.Node},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),o=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),e=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(t,o,e))},playJumpSound:function(){this.sound.getComponent("Sound").playJumpSound()},setInputControl:function(){var t=this;this.keyboardListener=cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(o,e){switch(o){case cc.KEY.a:t.accLeft=!0,t.accRight=!1;break;case cc.KEY.d:t.accLeft=!1,t.accRight=!0}},onKeyReleased:function(o,e){switch(o){case cc.KEY.a:t.accLeft=!1;break;case cc.KEY.d:t.accRight=!1}}},t.node)},removeKeyboardListener:function(){cc.eventManager.removeListener(this.keyboardListener)},hide:function(){this.node.active=!1},onLoad:function(){this.jumpAction=this.setJumpAction(),this.node.runAction(this.jumpAction),this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.setInputControl()},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t,this.node.x>this.canvas.width/2&&(this.node.x=-this.canvas.width/2),this.node.x<-this.canvas.width/2&&(this.node.x=this.canvas.width/2)}}),cc._RF.pop()},{}],Score:[function(t,o,e){"use strict";cc._RF.push(o,"72a26m3SuhHTY+bInGTq72L","Score"),cc.Class({extends:cc.Component,properties:{sound:cc.Node,score:0},gainScore:function(){this.score+=1,this.node.getComponent(cc.Label).string="Score: "+this.score,this.playScoreAudio()},playScoreAudio:function(){this.sound.playScoreAudio()},onLoad:function(){this.sound=this.sound.getComponent("Sound")}}),cc._RF.pop()},{}],Sound:[function(t,o,e){"use strict";cc._RF.push(o,"24cedONMeRBe7hwZt8dYIx/","Sound"),cc.Class({extends:cc.Component,properties:{jumpAudio:{default:null,url:cc.AudioClip},scoreAudio:{default:null,url:cc.AudioClip},clockAudio:{default:null,url:cc.AudioClip}},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},playScoreAudio:function(){cc.audioEngine.playEffect(this.scoreAudio,!1)},playClockAudio:function(){cc.audioEngine.playEffect(this.clockAudio,!1)},onLoad:function(){}}),cc._RF.pop()},{}],Star:[function(t,o,e){"use strict";cc._RF.push(o,"6f1deZxolVOxLJfzlylca6E","Star"),cc.Class({extends:cc.Component,properties:{pickRadius:0},getPlayerDistance:function(){var t=this.collectionGroup.player.getPosition();return cc.pDistance(this.node.position,t)},onPicked:function(){this.collectionGroup.gainScore(),this.backNode(),this.collectionGroup.spawnNewStar()},backNode:function(){this.collectionGroup.putBackStar(this.node)},onLoad:function(){},update:function(t){this.getPlayerDistance()<this.pickRadius&&this.onPicked()}}),cc._RF.pop()},{}]},{},["Clock","CollectionGroup","Common","Countdown","Final","Game","Global","Home","Player","Score","Sound","Star"]);