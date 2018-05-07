function StartWebpage(){
      this.Races=[];
   this.AddRaceBtn = document.createElement("BUTTON");
   this.x= document.createTextNode("Add Race")
   document.body.appendChild(this.AddRaceBtn)
   this.AddRaceBtn.appendChild(this.x);	

   this.DeleteRaceBtn = document.createElement("BUTTON");
   this.x= document.createTextNode("Delete Race")
   document.body.appendChild(this.DeleteRaceBtn)
   this.DeleteRaceBtn.appendChild(this.x); 


   this.AddRaceBtn.onclick=this.AddRace.bind(this);
   this.DeleteRaceBtn.onclick=this.DeleteRace.bind(this);
}


StartWebpage.prototype.AddRace=function(){
     this.Races[this.Races.length]= new Race();

}

StartWebpage.prototype.DeleteRace=function(){
     document.body.removeChild(this.Races[this.Races.length-1].RaceCourse);
    this.Races.pop();

}


function Race(){
    this.Racers=[];

	this.RaceCourse=document.createElement("Div");
	this.RaceCourse.setAttribute("class","RaceCourse");
	document.body.appendChild(this.RaceCourse);


	this.AddRunnerBtn=document.createElement("BUTTON");
	this.x=document.createTextNode("Add Runner");
	this.AddRunnerBtn.appendChild(this.x);
	this.RaceCourse.appendChild(this.AddRunnerBtn);

	this.StartRaceBtn=document.createElement("BUTTON");
	this.x=document.createTextNode("Start Race");
	this.StartRaceBtn.appendChild(this.x);
	this.RaceCourse.appendChild(this.StartRaceBtn);

  this.ResetRaceBtn=document.createElement("BUTTON");
  this.x=document.createTextNode("Reset Race");
  this.ResetRaceBtn.appendChild(this.x);
  this.RaceCourse.appendChild(this.ResetRaceBtn);

  this.RemoveRunnerBtn=document.createElement("BUTTON");
  this.x=document.createTextNode("Remove Runner");
  this.RemoveRunnerBtn.appendChild(this.x);
  this.RaceCourse.appendChild(this.RemoveRunnerBtn);

	this.AddRunnerBtn.onclick=this.AddRacers.bind(this);
	this.StartRaceBtn.onclick=this.StartRace.bind(this);
  this.ResetRaceBtn.onclick=this.ResetRace.bind(this);
   this.RemoveRunnerBtn.onclick=this.RemoveRunner.bind(this);
}


 Race.prototype.AddRacers=function(){
	this.Racers[this.Racers.length]= new Runner(this);
  this.RaceCourse.appendChild(this.Racers[this.Racers.length-1].getTrackTimeDiv());

}


Race.prototype.StartRace=function(){
	this.StartRaceBtn.disabled = true;
   this.ResetRaceBtn.disabled = false;
	for(var i=0;i<this.Racers.length;i++){
		  this.Racers[i].Run();
	 }
}


Race.prototype.ResetRace=function(){
    this.StartRaceBtn.disabled = false;
    this.ResetRaceBtn.disabled = true;
   
      for(var i=0;i<this.Racers.length;i++){
          clearInterval(this.Racers[i].RunUp);
          clearInterval(this.Racers[i].RunBack);
          this.Racers[i].Runner.style.left= 0+'px';
          this.Racers[i].Runner.style.backgroundPosition =0;
          this.Racers[i].Runner.style.transform="scaleX(+1)";
          this.Racers[i].TimeTD.innerHTML="- - -"
          this.Racers[i].DistanceTD.innerHTML="- - -"
         this.Racers[i].RaceTrack.style.borderColor="gray";
   }
}
Race.prototype.RemoveRunner=function(){
     clearInterval(this.Racers[this.Racers.length-1].RunUp);
     clearInterval(this.Racers[this.Racers.length-1].RunBack);
    this.RaceCourse.removeChild(this.Racers[this.Racers.length-1].TrackTimeDiv);
    this.Racers.pop();
  }







 
function Runner(me){
	this.race=me;
	this.TrackTimeDiv=document.createElement("Div");

  this.RaceTrack=document.createElement("Div");
  this.RaceTrack.setAttribute("class","RaceTrack");
  this.TrackTimeDiv.appendChild(this.RaceTrack);

	this.Runner=document.createElement("Div");
	this.Runner.setAttribute("class","Runner");
  this.RaceTrack.appendChild(this.Runner)

  this.TimerDiv=document.createElement("Div");
  this.TimerDiv.setAttribute("class","TimerDiv");
  this.TrackTimeDiv.appendChild(this.TimerDiv)


  this.CreateScoreBoard();

    this.Run.bind(this);
    this.Stop.bind(this);
    this.CreateScoreBoard.bind(this);
}


Runner.prototype.getTrackTimeDiv = function() {
  return this.TrackTimeDiv;
}

Runner.prototype.Run=function(){
 
  
  this.r= 0;
  this.fps=50;
  this.time = Math.floor(Math.random()*(8-3))+3;
  this.x=(0.7/(this.time/(2*this.fps)));
  this.pos =0;

  this.StartTime=(new Date()).getTime();
     
     console.log(this.time);
      console.log(this.x);
    

  this.RunUp = setInterval(RunAhead.bind(this), this.fps);

  function RunAhead() {
    this.Runner.style.transform="scaleX(+1)";
    
    if (this.pos>=700) {
                 this.time = Math.floor(Math.random()*(8-3))+3;
                 this.x=(0.7/(this.time/(2*this.fps)));

                if(this.pos>700) {this.pos=700;} 
                clearInterval(this.RunUp);
                this.Runner.style.transform="scaleX(-1)";
                this.RunBack = setInterval(RunReverse.bind(this), this.fps);

             function RunReverse() {
                if (this.pos <=0) {
                   if(this.pos<0) {this.pos=0;}

                      this.RaceTrack.style.borderColor = "red";
                        
                      for(var i=0;i<this.race.Racers.length;i++){
		                     this.race.Racers[i].Stop()
                         if(this.race.Racers[i].pos==0){
                           this.race.Racers[i].RaceTrack.style.borderColor = "red";
                         }
                     }

                } else {              
                      this.pos-=this.x; 
                       if(this.pos<0){this.pos=0;}
                      this.ReverseDistance=1400-this.pos;                     

                      this.r+=26;
                      this.Runner.style.left = this.pos + 'px';
                      this.Runner.style.backgroundPosition = this.r+'px';
                      this.DistanceTD.innerHTML=this.ReverseDistance.toPrecision(4);
                      this.CurrentTime=(new Date()).getTime();
                      this.TimeTD.innerHTML=((this.CurrentTime-this.StartTime)/1000).toPrecision(4)+" s";

                      
                      }
            }

   } else {
        
      this.pos+=this.x;
      if(this.pos>700) {this.pos=700;} 
      this.r+=26;
         this.Runner.style.left = this.pos + 'px';
         this.Runner.style.backgroundPosition = this.r+'px';
           this.DistanceTD.innerHTML=this.pos.toPrecision(4);
           this.CurrentTime=(new Date()).getTime();
           this.TimeTD.innerHTML=((this.CurrentTime-this.StartTime)/1000).toPrecision(4)+" s";

        
    }
  }
}



Runner.prototype.CreateScoreBoard=function(){
  /*ScoreTable*/
  this.ScoreBoard = document.createElement("TABLE");
  this.ScoreBoard.setAttribute("class", "ScoreBoard");
  this.TimerDiv.appendChild(this.ScoreBoard);

     /*Row1*/
    this.ScoreRow1 = document.createElement("TR");
    this.ScoreBoard.appendChild(this.ScoreRow1);

     this.ScoreHead1= document.createElement("TD");
     this.ScoreHead1.setAttribute("class","th");
     this.t= document.createTextNode("Distance(d)");
     this.ScoreHead1.appendChild(this.t);    
     this.ScoreRow1.appendChild(this.ScoreHead1);

     this.ScoreHead2= document.createElement("TD");
     this.ScoreHead2.setAttribute("class","th");
     this.t= document.createTextNode("Time(t)");
     this.ScoreHead2.appendChild(this.t);    
     this.ScoreRow1.appendChild(this.ScoreHead2);

      /*Row2*/
    this.ScoreRow2 = document.createElement("TR");
    this.ScoreBoard.appendChild(this.ScoreRow2);

     this.DistanceTD= document.createElement("TD");
     this.DistanceTD.setAttribute("class","td");
     this.ScoreRow2.appendChild(this.DistanceTD);
      this.DistanceTD.innerHTML="- - -";

     this.TimeTD= document.createElement("TD");
     this.TimeTD.setAttribute("class","td");
     this.ScoreRow2.appendChild(this.TimeTD);
     this.TimeTD.innerHTML="- - -";

}




Runner.prototype.Stop=function(){

clearInterval(this.RunUp);
clearInterval(this.RunBack);

}



