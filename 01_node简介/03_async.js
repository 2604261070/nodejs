// async function asd(){
//     return 10
// }

// console.log(asd());



// async function sum(a,b){
//     return a+b
// }

// async function main(){
//     console.log(sum(1,2));
//     console.log(await sum(1,2));

// }
// main()



// function fn1(){
//     return new Promise((a)=>{
//         a(1)
//     })
// }
// fn1().then((v)=>{
//     console.log(v);
// })
// console.log(2);

async function fn1(){
    console.log(1);
    console.log(2);
    await console.log(3);
    console.log(4);
}
fn1()
console.log(5);