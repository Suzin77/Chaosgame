var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            const width = canvas.width;
            const height = canvas.height;

            var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

            let a = {x:0, y:canvas.height};
            let b = {x:canvas.width/2, y:0};
            let c = {x:canvas.width , y:canvas.height}
            let d = {x:0, y:0}
            
            let start = {x:0, y:0}; // startowy punk
            let target = {x:400, y:400}; //docelowy punk
            let step = 0.5;
            let stop ={x:0 , y:0}; // punkt zatrymania w pol drogi. wg stop.
            drawStartPoints();

            let t1 = Date.now();
            render(1000);
            console.log(Date.now()- t1);

            function render(points){    
                for(let n=0;n<points; n++){
                    ctx.rect(start.x,start.y,1,1);               
                    choseTargetPoint();
                    calculateStep();
                    //ctx.rect(stop.x,stop.y,1,1);
                    ctx.strokeRect(stop.x,stop.y,1,1);
                    //ctx.stroke();
                    start.x = stop.x;
                    start.y = stop.y;
                    //b.x += 1;                               
                }
                //ctx.stroke(); 
                //b.x += 1;                               
                
                //requestAnimationFrame(render);
                //ctx.clearRect(0,0, canvas.width, canvas.height);

            }    

            function choseTargetPoint(){
                let targetTest = Math.floor(Math.random()*3+1);
                switch (targetTest) {
                    case 1:
                        target = a;
                        break;
                    case 2:
                        target =b;
                        break;
                    case 3:
                        target = c;
                        break;
                    case 4:
                        target = d;
                        break;         
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
           
document.querySelector(".renderChaos").addEventListener("click",()=>{
    let pointsNumber = document.querySelector("#fieldSliderValue").innerHTML;
    console.log(pointsNumber);
    ctx.clearRect(0,0, width, height);
    render(pointsNumber*1);
}, false);

// document.querySelector(".animate").addEventListener("click",()=>{
//     // b.x = 0;
//     let i = 0;
//     while(i<10){
//         setTimeout(() => {
//             ctx.clearRect(0,0, width, height);
//             render(100);
//             //i++;
//         }, 200);
//         i++;
//         debugger;
//         //b.x = i;
//     }
// },false);