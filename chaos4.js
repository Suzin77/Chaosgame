
var canvas = document.getElementById("squer");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let a = {x:0, y:canvas.height};
let b = {x:canvas.width, y:0};
let c = {x:canvas.width , y:canvas.height};
let d = {x:0, y:0};


let start = {x:0, y:0}; // startowy punk
let target = {x:400, y:400}; //docelowy punk
let step = 0.5;
let stop ={x:0 , y:0}; // punkt zatrymania w pol drogi. wg stop.
drawStartPoints();
let lastChose = choseTargetPoint();
let currentChose = 0;
let t1 = Date.now();
//for(let m = 0 ;  m<canvas.width; m++){
//    b.x = m;

for(let n=0;n<70000; n++){
    let count = 1;
    ctx.rect(start.x,start.y,1,1);
    currentChose = choseTargetPoint();
    while(currentChose === lastChose){                
        currentChose = choseTargetPoint();
        count++;
        debugger;
    }                
    calculateStep();
    ctx.rect(stop.x,stop.y,1,1);
    //ctx.stroke();
    lastChose = currentChose;
    start.x = stop.x;
    start.y = stop.y;                               
}
ctx.stroke();

//}
console.log(Date.now()- t1);

function choseTargetPoint(){
    let targetTest = Math.floor(Math.random()*4+1);
    switch (targetTest) {
        case 1:
            target = a;
            return "a";
        case 2:
            target = b;
            return "b";
        case 3:
            target = c;
            return "c";
        case 4:
            target = d;
            return "d";         
        default:
            break;
    }               
}

function drawStartPoints(){
    ctx.rect(a.x,a.y, 1,1);
    ctx.rect(b.x,b.y, 1,1);
    ctx.rect(c.x,c.y, 1,1);
    ctx.stroke();
}

function drawPoint(){
    for (let i =0; i<7;i++){
        stop.x = start.x + ((target.x - start.x)*step);
        stop.y = stop.y + ((target.y - start.y)*step);
        ctx.rect(start.x,start.y,1,1);
        ctx.rect(stop.x,stop.y,1,1);
        ctx.stroke();
    }
} 

function calculateStep(){
    if (target.x > start.x ){ stop.x = start.x + ((target.x- start.x)*step)}
    else {stop.x = start.x -((start.x - target.x)*step)}

    if (target.y > start.y){stop.y = start.y + ((target.y - start.y)*step)}
    else {stop.y = start.y - ((start.y - target.y)*step)}
}
ctx.stroke();