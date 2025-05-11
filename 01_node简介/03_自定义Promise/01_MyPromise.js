const PROMISE_STATE={
    PENDING:0,
    FULFILLED:1,
    REJECTED:2
}

class MyPromise{
    #result
    #state = PROMISE_STATE.PENDING
    #cellback =[]
    constructor(executor){
        //使用bind()让resolve中的this指向MyPromise
        executor(this.#resolve.bind(this),this.#reject.bind(this))
    }

    #resolve(value){
        if(this.#state != PROMISE_STATE.PENDING) return
        this.#result = value
        this.#state = PROMISE_STATE.FULFILLED
        //当cellback存在时,调用cellback来操控OnFulfiled,传入参数
        queueMicrotask(()=>{
            this.#cellback.forEach(v=>{
                v()
            })
        })
    }

    #reject(value){

    }

    then(onFulfilled, onRejected){
        return new MyPromise((resolve,reject)=>{
            if(this.#state === PROMISE_STATE.FULFILLED){
                queueMicrotask(()=>{
                    resolve(onFulfilled(this.#result))
                })
            } else if(this.#state === PROMISE_STATE.PENDING){
                //当状态为等待中的时候,我们将OnFulfiled函数交给cellback来操控
                this.#cellback.push(()=>{
                    resolve(onFulfilled(this.#result))
                })
            }
        })
    }

    log(){
        console.log(this);
    }
}

const pr = new MyPromise((resolve,reject)=>{
    //以函数的方法调用的,因此this指向windows,但是nodejs没有windows,因此this为undefine
    setTimeout(() => {
        resolve("123")  
    }, 1000);
})
pr.then((result)=>{
    console.log(result);
})

//以方法形式调用的,因此this指向pr,也就是MyPromise
pr.log()