// demo
// webSc.setHost("ws://......");
// webSc.init(function(data){
//     alert("server send:"+data);        
//     })
// webSc.send(" hello ");
// webSc.reStart()
// webSc.close()
    var webSc = {
        host:"ws://localhost:9502",
        interval:'1000',
        initPower:0,
        ws:null,
        closePower:1,
        HB:null,
        runServer:null,
        setHost:function(host){
            this.host =  host;
        },
        setIntervalTime:function(interval){
            this.interval = interval*1000;
        },
        init:function(runCallback){
            let self = this;
            self.ws = new WebSocket(self.host);
            self.ws.onopen = function(evt) {
                console.log("Connection open ...");
                self.HB = setInterval(function(){
                    if(self.closePower==1){
                        self.ws.send("heartbeat");
                    }else{
                        clearInterval(self.Hb);
                    }

                },self.interval);
                self.initPower=1;
            };

            self.ws.onmessage = function(evt) {
                console.log("Received Message: " + evt.data);
                if(typeof runCallback == "function"){
                    self.runServer = runCallback;
                    runCallback(evt.data);
                }
            };

            self.ws.onclose = function(evt) {
                console.log(self);
                if(self.closePower == 1){
                    self.init(runCallback);
                }
                self.initPower = 0;
            };
        },
        close:function(){
            let self = this;
            if(self.ws){
                self.initPower = 0;
                self.closePower = 0;
                self.ws.close();
                clearInterval(self.HB);
            }
        },
        reStart:function(){
            let self = this;
            self.close();
            setTimeout(function(){
                self.closePower = 1;
                self.initPower = 1;
                self.init(self.runServer);
            },500);
            return true;
        },
        send:function(data){
            let self = this;
            if(self.initPower==1){
                self.ws.send(data);
            }else{
                alert("please run init function");
            }

        }
    }
