// 创建一个基础的promise对象
    // 创建对象时需要传入一个方法,并且接受两个参数resolve, reject
        // resolve 和 reject 是两个函数，通过这两个函数可以向Promise中存储数据
        // resolve在执行正常时存储数据，reject在执行错误时存储数据
const promise = new Promise((resolve, reject)=>{
    resolve("成功:resolve返回的数据")
    // reject("失败:reject返回的数据")
})



// 读取promise中的数据
    // 调用then方法,在then中传入两个参数
    //     通过resolve存储的数据，会调用第一个函数返回，
    //     可以在第一个函数中编写处理数据的代码

    //     通过reject存储的数据或者出现异常时，会调用第二个函数返回
    //     可以在第二个函数中编写处理异常的代码
promise.then((result)=>{
    console.log("成功:"+result);
},(reason)=>{
    console.log("失败:"+reason);
})

/* 
    Promise中维护了两个隐藏属性：
        PromiseResult
            - 用来存储数据

        PromiseState
            - 记录Promise的状态（三种状态）
                pending   （进行中）
                fulfilled（完成） 通过resolve存储数据时
                rejected（拒绝，出错了） 出错了或通过reject存储数据时
            - state只能修改一次，修改以后永远不会在变
    
        流程：
            当Promise创建时，PromiseState初始值为pending，
                当通过resolve存储数据时 PromiseState 变为fulfilled（完成）
                    PromiseResult变为存储的数据
                当通过reject存储数据或出错时 PromiseState 变为rejected（拒绝，出错了）
                    PromiseResult变为存储的数据 或 异常对象

            当我们通过then读取数据时，相当于为Promise设置了回调函数，
                如果PromiseState变为fulfilled，则调用then的第一个回调函数来返回数据
                如果PromiseState变为rejected，则调用then的第二个回调函数来返回数据
            
*/

// promise的其他实例方法
    // 1.catch()
    //     catch() 用法和then类似，但是只需要一个回调函数作为参数
    //     catch()中的回调函数只会在Promise被拒绝时才调用
    //     catch() 相当于 then(null, reason => {})
    //     catch() 就是一个专门处理Promise异常的方法
    // 2. finally()
    //     但是finally的回调函数中不会接收到数据
    //     finally()通常用来编写一些无论成功与否都要执行代码
    //     无论是正常存储数据还是出现异常了，finally总会执行
    promise.catch(()=>{
        console.log("失败的方法");
    })
    promise.finally(()=>{
        console.log("咋样都执行的方法");
    })