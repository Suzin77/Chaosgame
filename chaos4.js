
var canvas = document.getElementById("squer");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const config = {                
    startingPoints: 3 //here must be function to get actual radio checked on load
};

let a = {x:0, y:canvas.height};
let b = {x:canvas.width/2, y:0};
let c = {x:canvas.width , y:canvas.height};
let d = {x:0, y:0};


let start = {x:0, y:0}; // startowy punk
let target = {x:400, y:400}; //docelowy punk
let step = 0.5;
let stop ={x:0 , y:0}; // punkt zatrymania w pol drogi. wg stop.

let lastChose = choseTargetPoint();
let currentChose = 0;
let t1 = Date.now();

function squereCanvasWidth(){
    if(config.startingPoints === 4){
        b.x = canvas.width;
    } else if (config.startingPoints === 3){
        b.x = canvas.width/2;
    }
}

function render(points){
    for(let n=0;n<points; n++){
        ctx.rect(start.x,start.y,1,1);
        currentChose = choseTargetPoint();
        if (config.startingPoints === 4){
            while(currentChose === lastChose){                
                currentChose = choseTargetPoint();               
            }
        }                
        calculateStep();
        //ctx.rect(stop.x,stop.y,1,1);
        ctx.strokeRect(stop.x,stop.y,1,1);
        //ctx.stroke();
        lastChose = currentChose;
        start.x = stop.x;
        start.y = stop.y;                               
    }
}
//ctx.stroke();
console.log(Date.now()- t1);

function choseTargetPoint(){
    let targetTest = Math.floor(Math.random()*config.startingPoints+1);
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

function calculateStep(){
    if (target.x > start.x ){ stop.x = start.x + ((target.x- start.x)*step)}
    else {stop.x = start.x -((start.x - target.x)*step)}

    if (target.y > start.y){stop.y = start.y + ((target.y - start.y)*step)}
    else {stop.y = start.y - ((start.y - target.y)*step)}
}

function targetId(e){
    config.startingPoints =  e.target.id*1;
    squereCanvasWidth();
    console.log("ilosc poczatkowa: "+ config.startingPoints);
}

function radioCheck(){
    let itemlist = document.querySelectorAll('.radio-points');
    for (let i =0; i<itemlist.lenght; i++){
        if(itemlist[i].type === "radio" && itemlist[i].checked){
            console.log("from hell: "+itemlist[i].id);
        }
    }
}

//targetId();
//radioCheck(document.querySelectorAll('.radio-points'));
//document.querySelector('.radio-points').addEventListener('load',radioCheck(), true);
document.querySelector('.radio-points').addEventListener('click',targetId, true);

document.querySelector(".renderChaos").addEventListener("click",()=>{
    let pointsNumber = document.querySelector("#fieldSliderValue").innerHTML;
    ctx.clearRect(0,0, width, height);
    render(pointsNumber*1);
});
//ctx.stroke();