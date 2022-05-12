const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        _moveLeft: null,
        _jump: null,
        _moveRight: null,
        _flag: false,
        _moveDown : null ,
        _shot : null,
        


    },
    onLoad() {
        this._moveDown = this.moveDown.bind(this);
        this._jump = this.jump.bind(this);
        this._moveLeft = this.moveLeft.bind(this);
        this._moveRight = this.moveRight.bind(this);
        this._shot = this.shot.bind(this);
        Emitter.instance = new Emitter();
       Emitter.instance.registerEvent("MOVELEFT", this._moveLeft);
       Emitter.instance.registerEvent("MOVERIGHT", this._moveRight);
       Emitter.instance.registerEvent("JUMP", this._jump);
       Emitter.instance.registerEvent("MOVEDOWN", this._moveDown);
       Emitter.instance.registerEvent("SHOT", this.shot);

       Emitter.instance.registerEvent("MOVELEFT_up", this._moveLeft);
       Emitter.instance.registerEvent("MOVERIGHT_up", this._moveRight);
       Emitter.instance.registerEvent("JUMP_up", this._jump);
       Emitter.instance.registerEvent("MOVEDOWN_up", this._moveDown);
       Emitter.instance.registerEvent("SHOT_up", this.shot);
    },
    moveDown(value) {
        if (!this._flag) {
            this._flag = true;
            
            this.spineBoy.addAnimation(0, "hoverboard", true);
            this.spineBoy.setEventListener((entry, event) => {
                if (entry.animationEnd != 0) this._flag = false;
            });
        }
        
    },
    shot(value) {
        if (!this._flag) { 
            this._flag = true;  
            this.spineBoy.addAnimation(0, "shoot", true);
            this.spineBoy.setEventListener((entry, event) => {
                if (entry.animationEnd != 0) this._flag = false;
            });
        }
        
    },
    jump(value) {
        cc.log(value);
        if (!this._flag) {
            this._flag = true;
            this.spineBoy.setAnimation(0, "jump", false);
            this.spineBoy.addAnimation(0, "idle-turn", false);
            this.spineBoy.addAnimation(0, "idle", true);
            this.spineBoy.setEventListener((entry, event) => {
                if (entry.animationEnd != 0) this._flag = false;
            });
        }
        
    },
    moveLeft(value) {
        cc.log(value);
        if (!this._flag && (value)) {
            this._flag = true;
            this.node.runAction(cc.flipX(true));
            this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.2, -10, 0), cc.moveBy(0.3, -20, 0))));
            this.spineBoy.setAnimation(0, "walk", false);
            this.spineBoy.addAnimation(0, "run", true);
        } else if (!this._flag || (!value)) {
            this._flag = false;
            this.node.stopAllActions();
            this.spineBoy.setAnimation(0, "run-to-idle", false);
            this.spineBoy.addAnimation(0, "idle", true);
        }
    },
    
    moveRight(value) {
        cc.log(value);
        if (!this._flag && (value)) {
            this._flag = true;
            this.node.runAction(cc.flipX(false));
            this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.2,10,0),cc.moveBy(0.3,20,0))));
            this.spineBoy.setAnimation(0, "walk", false);
            this.spineBoy.addAnimation(0, "run", true);
        }else if(!this._flag || (!value)){
            this._flag = false;
            this.node.stopAllActions();
            this.spineBoy.setAnimation(0,"run-to-idle",false);
            this.spineBoy.addAnimation(0,"idle",true);
        }
    },
    start() {
        this.spineBoy.addAnimation(0, "portal",false);
        this.spineBoy.addAnimation(0, "idle",true);
    },

    // update (dt) {},
});
