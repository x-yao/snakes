window.onload = function(){
var canvas = document.getElementById('myCanvas');
if(canvas.getContext){
	var ctx = canvas.getContext('2d');
}
var x=250;
var y=200;
var width=Math.round($(window).width());
var height=Math.round($(window).height());
var speed=200;
var d=4;
var len=5;
var snakes = new Array();
var foods = new Array();
var int=setInterval(move,speed);
var int2=setInterval(checkHit,speed);
var score=0;
canvas.style.left = width/2-250+"px";
function init(){//初始化
	ctx.clearRect(0,0,500,500);
	ctx.fillStyle="RGB(56,177,183)";
    for(var i = len-1;i>=0;i--){  
               snakes[i] = {x:200+(len-i)*10,y:200};  
               ctx.fillRect(snakes[i].x,snakes[i].y,10,10);  
           }
	foods[0] = {x:parseInt(Math.round(Math.random()*49)*10),y:parseInt(Math.round(Math.random()*49))*10};
	ctx.fillStyle="rgb(32,96,130)";  
    ctx.fillRect(foods[0].x,foods[0].y,10,10);
}
    init();  
   // print(); 
   function draw(_x,_y){  
       //alert("_x:"+_x+";_y:"+_y);  
       ctx.clearRect(0,0,500,500);       
       //循环替代位置，从最后一个开始  
	   ctx.fillStyle="RGB(56,177,183)"; 
	   for(var i = len-1;i>=1;i-- ){
           //console.log(i);  
           snakes[i].x = snakes[i-1].x;  
           snakes[i].y = snakes[i-1].y;      
           ctx.fillRect(snakes[i].x,snakes[i].y, 10, 10); 
       };
       snakes[0].x = _x;  
       snakes[0].y = _y;  
       ctx.fillRect(_x, _y, 10, 10);
      /* ctx.save();
	   ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
	   ctx.shadowOffsetX = 2;
	   ctx.shadowOffsetY = 2;
	   ctx.shadowBlur = 0;  
       ctx.restore();*/
	
	   ctx.fillStyle="rgb(32,96,130)";
       for(var i = 0;i<foods.length;i++){  
           ctx.fillRect(foods[i].x,foods[i].y,10,10);  
       }  

   }  
	$(document).keydown(function keydown(e){  
		switch(e.keyCode){  
		            //上W  
		            case 87:  
		                if(d!=2&&snakes[0].x!=snakes[1].x){  
		                    d = 1;  
		                }  
		                break;  
		            //下S  
		            case 83:  
		                if(d!=1&&snakes[0].x!=snakes[1].x){  
		                    d = 2;  
		                }  
		                break;  
		            //左A  
		            case 65:  
		                if(d!=4&&snakes[0].y!=snakes[1].y){  
		                    d = 3;  
		                }  
		                break;  
		            //右D  
		            case 68:  
		                if(d!=3&&snakes[0].y!=snakes[1].y){  
		                   d = 4;  
		                }  
		                break;  
		            //测试  
		            case 38:  
		                addSnake();
		                break;
					case 37:
						speedUp();
						break;
					case 39:
						speedDown();
						break;  
		            default:  
		        }  
		    });
			function speedUp(){
			 	clearInterval(int);
				clearInterval(int2);
				if(speed>=40){
				speed=speed-20;}
				int=setInterval(move,speed);
				int2=setInterval(checkHit,speed); 
			}
			function speedDown(){
			 	clearInterval(int);
				clearInterval(int2);
				if(speed<=200){
				speed=speed+20;}
				int=setInterval(move,speed);
				int2=setInterval(checkHit,speed); 
			}
	function move(){  
		  var againGame=document.getElementById('again');
			     switch(d){  
                        case 1:  
			             y = y - 10;   
			               // if(y<0){  
			                  //  y = 490; 
			               // }  
			                break;  
			            case 2:  
			                y = y + 10;  
			              //  if(y>490){  
			                  //  y = 0;  
			              //  }  
			                break;  
			            case 3:  
			                x = x-10;  
			              //  if(x<0){  
			                  //  x = 490;  
			             //   }  
			                break;  
			            case 4:  
			                x = x + 10;  
			              //  if(x>490){  
			                  //  x = 0;  
			         //}  
			    break;  
			 default:  
			 }  
			 if(x>490||x<0||y>490||y<0){
			 gameOver();
		 	againGame.onclick=function(){
		 		again();
		 	}
			 }
			 for(var i=1;i<len;i++){
				 if((x==snakes[i].x)&&(y==snakes[i].y)){
 			 	gameOver();
				againGame.onclick=function(){
					again();
				}
			 }}
	draw(x,y);  
	};  
	function again(){
		speed=200;
		var d=document.getElementById('gameOver');
		d.style.display = "none";
		int=setInterval(move,speed);
		int2=setInterval(checkHit,speed);
		score=0;
		document.getElementById("scoreNum").innerHTML=score;
	}
	function addSnake(){  
	        snakes[len]= {x:snakes[len-1].x+10,y:snakes[len-1].y+10};  
	        len = len + 1;    
	    }
    function createFood(){
		while(1){
        var fx = parseInt(Math.round(Math.random()*49)*10);  
        var fy = parseInt(Math.round(Math.random()*49)*10);
		var foodN=0//0 buchonghe 1chonghe
		for(var i=0;i<len;i++){
		   if ((fx==snakes[i].x)&&(fy==snakes[i].y)){
		     foodN=1;
			 break;    
		   }
	   }
	   if(foodN==0){
             break
	   }
    }
	   foods[foods.length] = {x:fx,y:fy};
    } 
    function deleteFood(fIndex){
        foods.splice(fIndex,1);  
    }  
	function gameOver(){
	 	clearInterval(int);
		clearInterval(int2);
		var b=document.getElementById("gameOver");
		b.style.display = "block";
		x=250;
		y=200;
		speed=10;
		d=4;
		len=5;
		init();
	}
    function checkHit(){  
        for(var i=0;i<foods.length;i++){  
            var fx = foods[i].x;  
            var fy = foods[i].y;              
            if((Math.abs(fx-x)<10)&&(Math.abs(fy-y)<10)){  
                addSnake(); 
                deleteFood(i); 
				createFood();
				score=score+5;
				document.getElementById("scoreNum").innerHTML=score;
				speedUp();
        }  
    }
};
}