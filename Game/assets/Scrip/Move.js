
const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,


    properties: {
        spineBoy: sp.Skeleton,
        _flag:false,
    },

    onLoad: function () {
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
       
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:  
                if(!this._flag){
                    this._flag=true;
                    console.log(' Left');
                    Emitter.instance.emit('MOVELEFT',true);
                }
                break;
            case cc.macro.KEY.right:
                if(!this._flag){
                    this._flag=true;
                    console.log('Left');
                    Emitter.instance.emit('MOVERIGHT',true);
                }
                break;
            case cc.macro.KEY.up:
                if(!this._flag){
                    this._flag=true;
                    console.log('Up');
                   Emitter.instance.emit('JUMP',true) 
                }           
                break;
            case cc.macro.KEY.down:
                if(!this._flag){
                    this._flag=true;
                    console.log('down');
                   Emitter.instance.emit('MOVEDOWN',true) 
                }           
                break;
            case cc.macro.KEY.space:
                if(!this._flag){
                        this._flag=true;
                        console.log('space');
                       Emitter.instance.emit('SHOT',true) 
                    }           
                    break;
                
        }
    },

    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.up:
                this._flag = false;
                console.log('Release Up');
                Emitter.instance.emit('JUMP_up',false);
                break;
            case cc.macro.KEY.left:
                this._flag = false;
                console.log('Release Left');
                Emitter.instance.emit('MOVELEFT_up',false);
                break;
            case cc.macro.KEY.right:
                this._flag = false;
                console.log('Release Right');
                Emitter.instance.emit('MOVERIGHT_up',false);
                break;
            case cc.macro.KEY.down:
                if(!this._flag){
                    this._flag=true;
                    console.log('down');
                   Emitter.instance.emit('MOVEDOWN_up',true) 
                }           
                break;    
            case cc.macro.KEY.space:
                    if(!this._flag){
                            this._flag=true;
                            console.log('space');
                           Emitter.instance.emit('SHOT_UP',true) 
                        }           
                        break;
            
        }
    },
    start() {
    },
    // update (dt) {},
});