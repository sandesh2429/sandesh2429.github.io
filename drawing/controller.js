/**
 * [PaintController description]
 * @param {[class]} model [paint model]
 * @param {[class]} view  [paint view]
 */
function PaintController(model,view) {
    this.Model = model;
    this.View = view;
    var _this=this;
    
//attach  
 this.View.CircleBtnClicked.attach(function () {
                          _this.addItemCon()}); 

this.View.RectangleBtnClicked.attach(function () {
                          _this.addItemCon()});

this.View.TriangleBtnClicked.attach(function () {
                          _this.addItemCon()}); 

this.View.SelectionBtnClicked.attach(function () {
                          _this.addSelectionCon()});

this.View.DeleteBtnClicked.attach(function () {
                          _this.DeleteItemCon()});                            


}

/**
 * AddsItems to model
 */
 PaintController.prototype.addItemCon=function(){
 	console.log(this.View.shape);
 	var _this=this;
 this.View.Elements.DrawingPad.get(0).onmousedown=function(){
  	   clearInterval(_this.View.MarchSelection);	
  	   _this.View.ClearSelection();
  	    _this.BoundedX=event.x-event.currentTarget.offsetLeft+document.body.scrollLeft;
  	    _this.BoundedY=event.y-event.currentTarget.offsetTop+document.body.scrollTop;
  	    _this.BoundedXEnd=event.x-event.currentTarget.offsetLeft+document.body.scrollLeft;
  	    _this.BoundedYEnd=event.y-event.currentTarget.offsetTop+document.body.scrollTop;
  	    _this.Properties={shape:_this.View.shape, BoundedX:_this.BoundedX,  BoundedY:_this.BoundedY, BoundedXEnd:_this.BoundedXEnd,  BoundedYEnd:_this.BoundedYEnd};

  	    _this.Model.addItemMod(_this.Properties);


     function ReadCoordinate(){   //read co-ordinate on canvas
  	             _this.BoundedXEnd=event.x-event.currentTarget.offsetLeft+document.body.scrollLeft;;
  	             _this.BoundedYEnd=event.y-event.currentTarget.offsetTop+document.body.scrollTop;
  	             _this.Properties={shape:_this.View.shape, BoundedX:_this.BoundedX,  BoundedY:_this.BoundedY, BoundedXEnd:_this.BoundedXEnd,  BoundedYEnd:_this.BoundedYEnd};

               }


 _this.View.Elements.DrawingPad.get(0).onmousemove= function(){
 	         ReadCoordinate();
 	         _this.Model.updateItemMod(_this.Properties);

 	               }

 _this.View.Elements.DrawingPad.get(0).onmouseup=function(){
    	    _this.View.Elements.DrawingPad.get(0).onmousemove=undefined;
    	    _this.View.Elements.DrawingPad.get(0).onmouseup=undefined;

    	    ReadCoordinate();
    	   _this.Model.updateItemMod(_this.Properties);
    }

}
}


/**
 * passes selection values to model
 */
 PaintController.prototype.addSelectionCon=function(){


 	console.log(this.View.shape);
 	var _this=this;
 this.View.Elements.DrawingPad.get(0).onmousedown=function(){
  	  clearInterval(_this.View.MarchSelection);	
  	  _this.View.ClearSelection();
  	    _this.BoundedX=event.x-event.currentTarget.offsetLeft+document.body.scrollLeft;
  	    _this.BoundedY=event.y-event.currentTarget.offsetTop+document.body.scrollTop;
  	    _this.BoundedXEnd=event.x-event.currentTarget.offsetLeft+document.body.scrollLeft;
  	    _this.BoundedYEnd=event.y-event.currentTarget.offsetTop+document.body.scrollTop;
  	    _this.Properties={shape:_this.View.shape, BoundedX:_this.BoundedX,  BoundedY:_this.BoundedY, BoundedXEnd:_this.BoundedXEnd,  BoundedYEnd:_this.BoundedYEnd};

  	    _this.Model.addSelectionMod(_this.Properties);


     function ReadCoordinate(){     //read co-ordinate on canvas
  	             _this.BoundedXEnd=event.x-event.currentTarget.offsetLeft+document.body.scrollLeft;;
  	             _this.BoundedYEnd=event.y-event.currentTarget.offsetTop+document.body.scrollTop;
  	             _this.Properties={shape:_this.View.shape, BoundedX:_this.BoundedX,  BoundedY:_this.BoundedY, BoundedXEnd:_this.BoundedXEnd,  BoundedYEnd:_this.BoundedYEnd};

               }


 _this.View.Elements.DrawingPad.get(0).onmousemove= function(){
 	         ReadCoordinate();
 	         _this.Model.updateSelectionMod(_this.Properties);

 	               }

 _this.View.Elements.DrawingPad.get(0).onmouseup=function(){
    	    _this.View.Elements.DrawingPad.get(0).onmousemove=undefined;
    	    _this.View.Elements.DrawingPad.get(0).onmouseup=undefined;
    	    _this.View.ShowMarching();

    }

  }
 
}

PaintController.prototype.DeleteItemCon=function(){
clearInterval(this.View.MarchSelection);	
this.Model.DeleteSelectedItems();

}