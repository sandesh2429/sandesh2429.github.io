/**
 * renders figures
 * @param {[paint view]} model    [already stored data]
 * @param {[type]} elements
 */
function PaintView(model,elements){

	 this.Model=model;
	 this.Elements=elements;
	 var _this=this;
	 this.shape='';
	 this.ctx2 = this.Elements.SelectionCanvas.get(0).getContext("2d");
	
	  this.CircleBtnClicked= new Event(this);//creates new event for clicking of circle button
	  this.RectangleBtnClicked= new Event(this);//creates new event for clicking of rectangle button
	  this.TriangleBtnClicked= new Event(this);//creates new event for clicking of Triangle button
	  this.DeleteBtnClicked= new Event(this);//creates new event for clicking of delete button
	  this.SelectionBtnClicked= new Event(this);//creates new event for clicking of selection button
     //attach
    
	  this.Model.itemAdded.attach(function(){ _this.ViewRender();} )
	  this.Model.itemUpdated.attach(function(){ _this.ViewRender();} )
	  this.Model.selectionAdded.attach(function(){ _this.SelectionRender();} )
	  this.Model.selectionUpdated.attach(function(){ _this.SelectionRender();} )
	  this.Model.selectionOnSelected.attach(function(){ _this.ShowSelections();} )

	    


    //onclick notify
	  this.Elements.CircleButton.click(function () {
	  	_this.shape='Circle';
	  	_this.ctx2.clearRect(0, 0, 1200, 800);
      _this.CircleBtnClicked.notify(); 
         });

	  this.Elements.RectangleButton.click(function () {
	  	_this.shape='Rectangle';
	  	_this.ctx2.clearRect(0, 0, 1200, 800);
      _this.RectangleBtnClicked.notify(); 
         });
	
      this.Elements.SelectionButton.click(function () {
	  	_this.shape='Selection';
      _this.SelectionBtnClicked.notify(); 
         });

      this.Elements.DeleteButton.click(function () {
        _this.ctx2.clearRect(0, 0, 1200, 800);
      _this.DeleteBtnClicked.notify(); 
         });
	
}
/**
 * Renders items stored in array on canvas
 */
PaintView.prototype.ViewRender=function() {

this.ctx = this.Elements.DrawingPad.get(0).getContext("2d");
this.ctx.clearRect(0, 0, 1200, 800);

for(var i=0;i<=this.Model._items.length-1;i++){
	var properties=this.Model._items[i];
	
	switch(properties.shape){
		case 'Rectangle':this.DrawRectangle(properties,this.ctx);break;
		case 'Circle':this.DrawCircle(properties,this.ctx);break;
		case 'Triangle':break;

	}
  }
}
/**
 * Draws Circle
 * @param {[object]} prop    [co-ordinates of figures]
 * @param {[context]} context
 */
PaintView.prototype.DrawCircle=function(prop,context){
   context.beginPath();
   context.arc(prop.BoundedX,prop.BoundedY,Math.abs(prop.BoundedXEnd-prop.BoundedX),0, 2 * Math.PI);
   context.stroke();
	}

PaintView.prototype.DrawRectangle=function(prop,context){

   context.beginPath();
   context.rect(prop.BoundedX, prop.BoundedY, prop.BoundedXEnd-prop.BoundedX, prop.BoundedYEnd-prop.BoundedY);
   context.stroke();
}
	
/**
 * Renders selection 
 */
PaintView.prototype.SelectionRender=function() {
this.ctx2.clearRect(0, 0, 1200, 800);
this.ctx2.beginPath();
this.ctx2.setLineDash([12]);
this.ctx2.strokeStyle = 'blue';
this.ctx2.rect(this.Model.selection.BoundedX, this.Model.selection.BoundedY, this.Model.selection.BoundedXEnd-this.Model.selection.BoundedX, this.Model.selection.BoundedYEnd-this.Model.selection.BoundedY);
this.ctx2.stroke();		
}



PaintView.prototype.ShowSelections=function(){
	console.log(this.Model.selectedItems);
	   

for(var i=0;i<=this.Model.selectedItems.length-1;i++){
	var ItemIndex=this.Model.selectedItems[i];

 if(this.Model._items[ItemIndex].shape=='Rectangle'){
 var figure=this.Model._items[ItemIndex];
 this.ctx2.beginPath();
 this.ctx2.setLineDash([10,8]);
 this.ctx2.strokeStyle = '#595959';
 this.ctx2.lineDashOffset = -this.offset;
 this.ctx2.rect(figure.BoundedX-10, figure.BoundedY-10, figure.BoundedXEnd-figure.BoundedX+20, figure.BoundedYEnd-figure.BoundedY+20);
 this.ctx2.stroke();		

   }
  if(this.Model._items[ItemIndex].shape=='Circle'){
 var figure=this.Model._items[ItemIndex];
 var radius=Math.abs(figure.BoundedXEnd-figure.BoundedX);
 this.ctx2.beginPath();
 this.ctx2.setLineDash([7]);
 this.ctx2.strokeStyle = '#595959';
 this.ctx2.rect(figure.BoundedX-radius-10,figure.BoundedY-radius-10,2*radius+20,2*radius+20);
 this.ctx2.stroke();		

   }
 }
}

PaintView.prototype.ShowMarching=function(){
	this.offset=0;
	this.MarchSelection = setInterval(march, 50);
	 var _this=this;

	function march() {
        _this.offset++;
        if (_this.offset > 16) {
             _this.offset = 0;
           }_this.ctx2.clearRect(0,0,1200 ,800);
           _this.ShowSelections();
         
}
}


PaintView.prototype.ClearSelection=function(){
	this.ctx2.clearRect(0, 0, 1200, 800);

}
