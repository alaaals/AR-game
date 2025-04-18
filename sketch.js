let world;
let marker;
let blocks=[];
let cupx, cupy;
let stackedRect=[];
let p_x, p_y;
// let start;
let hiroPos;
let plat;
let score=0;
let startTime=0;
let state;
let totalTime;
let elapsedTime;
let new_y;
function preload(){


	plat = loadImage("images/plat.png");


}


function setup(){


  world = new World('ARScene');

  marker = world.getMarker('hiro');

  totalTime = 30;


 //setTimeout(startTime, 5000);
  startTime=millis();

  state=0;




  for(let i =0; i<50;i++){
  	let tmp= new Block();
  	blocks.push(tmp);


  }

    p_x = width/2;
    p_y = height/2;


}



function draw(){



	 world.clearDrawingCanvas();

	

	
console.log(startTime)

	 if(state==0){//begin


	 		console.log(marker.isVisible())
	 			
	

	 	if(marker.isVisible()){

	 		state=1;
	 	}




	 }else if(state==1){


 
	   elapsedTime = millis() - startTime;

	 let elapsedSeconds = map(elapsedTime, 0, 30000, 0, 30);


	 let remainingTime = totalTime - elapsedSeconds;
	  document.getElementById('timer').innerHTML = remainingTime;

	 	 	document.querySelector("#instructions").style.display = "none";
	

  	


	 for(let i =0; i<blocks.length;i++){

	 	blocks[i].move();

	 	if(blocks[i].detect()==true){

	 		new_y = blocks[i].y;
	 		stackedRect.push(blocks[i])
	 		score++;
  	document.getElementById('points').innerHTML = score;
	 			blocks.splice(i,1)

	 }

	 if (marker.isVisible()==true) {
    hiroPos = marker.getScreenPosition();
 
    p_x = hiroPos.x;
    p_y = hiroPos.y;
	 	}
  }

  

  for(let i=0;i<stackedRect.length;i++){

  	console.log(stackedRect[i].y) 
  	
  	let stackedY = stackedRect[i].y - 10*stackedRect.length-5;//- 10*stackedRect.length;
  	stackedRect[i].speed = 0;
		fill(stackedRect[i].color);
  	rect(p_x,stackedY,25,10);
  	

		
  }

  if(remainingTime<=0 && score<20){
  	state=2;
  		document.querySelector("#lose").style.display = "block";
  }else if(remainingTime<=0 && score>=20){
  		document.querySelector("#win").style.display = "block";
  	state=3;
  }


  imageMode(CENTER);
  image(plat,p_x,p_y,50,50);
}else if(state==2){
	//lose
	console.log("You lose!");
}else if(state==3){
	console.log("You win!");

}


}





class Block{


	constructor(){

		this.speed=random(0.5,5);
		this.x = random(width);
		this.y = random(-500,0);
		this.color=color(random(255),random(255),random(255));


	
	}



	move(){

		noStroke();

		fill(this.color);
		rect(this.x,this.y,25,10)

		this.y+=this.speed;

		if(this.y>height){
			this.y=random(-500,0);
			this.speed=random(0.5,5);
			this.x = random(width);

		}

	
		
	}

	detect(){

		let d = dist(p_x,p_y,this.x,this.y)

		let cooldown=10;

		if(d<50 ){

			return true;
			cooldown--;
		if(cooldown<0){
			cooldown=10;
		}

		}


		else{
			return false;

		}

	}

}