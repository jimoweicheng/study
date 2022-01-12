let SENDUNMBER = 0;
class axios{
    constructor(){
        this.ajax = new send();
    }
    get(url){
        let self = this;
        return new Promise(function(resolve,reject){
            self.ajax.send(url,resolve,reject)
        })
    }
    
}
class send{
    cache = {};
    TIMES = 2000;
    RES = {
        status:"success",
        code:1,
        data:[1,2,3,4,5,6]
    }
    send(url,resolve,reject){
        let cache = this.cache[url];
        if(!cache){
            this.logUnm();
            this.cache[url] = [];
            setTimeout(() => {
                resolve(this.RES);
                this.clearStackQueue(url,this.RES);
            }, 3000);
        }else{
            cache.push(resolve)
        }
    }
    clearStackQueue(url,res){
        let cache = this.cache[url];
        if(cache){
            cache.forEach((key)=>{
                key(res)
            });
            delete  this.cache[url]
        }

    }
    logUnm(){
        ++SENDUNMBER;
        console.log('send次数',SENDUNMBER)
    }
}


let a = new axios();

function getData (){
    a.get("localhost").then((res)=>{
        console.log(res)
    })
}


function getDatas(){
    getData();
    getData();
    getData();
    getData();
}
getDatas();

setInterval(() => {
    getDatas();
}, 2500);