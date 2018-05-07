
/**
 * stores data incoming from Paint Controller
 */
function PaintModel() {
    this._items=[];//stores objects of figures in array 
   

    this.itemAdded = new Event(this);
    this.itemUpdated = new Event(this);
    this.selectionAdded= new Event(this);
    this.selectionUpdated=new Event(this);
    this.selectionOnSelected= new Event(this);


   
}

/**
 * stores data tranferred by Paint Controller
 * @param {[object]} item [Co-ordinates of figures]
 */
PaintModel.prototype.addItemMod=function (item) {
        this._items.push(item);   
        this.itemAdded.notify();

    }


PaintModel.prototype.updateItemMod=function(updateditem){//Updates array of figures
	this._items.pop();
	this._items.push(updateditem);
	this.itemUpdated.notify();
}

PaintModel.prototype.addSelectionMod=function(selection){//stores selection rectangle properties in selection variable of model
	this.selectedItems=[];
	
	this.selection=selection;
	this.selectionAdded.notify();
}

PaintModel.prototype.updateSelectionMod=function(selection){//Updates Selection
    this.selection=selection;
    
	this.selectionUpdated.notify();
	this.selectedOrNOt(this.selection);

}
PaintModel.prototype.selectedOrNOt=function(selection){//Checks figures are selected or not
	var centerX;
	var centerY;
	this.selectedItems=[];

	for(var i=this._items.length-1;i>=0;i--){
		switch(this._items[i].shape){

			case 'Rectangle':centerX=(this._items[i].BoundedX+this._items[i].BoundedXEnd)/2;
		                     centerY=(this._items[i].BoundedY+this._items[i].BoundedYEnd)/2; 	
			break;


			case 'Circle':centerX=this._items[i].BoundedX;
			              centerY=this._items[i].BoundedY;

			break;
			}

		if(selection.BoundedX<centerX&&selection.BoundedXEnd>centerX||selection.BoundedX>centerX&&selection.BoundedXEnd<centerX){
			if(selection.BoundedY<centerY&&selection.BoundedYEnd>centerY||selection.BoundedY>centerY&&selection.BoundedYEnd<centerY){
				this.selectedItems.push(i);
				console.log(i);
				this.selectionOnSelected.notify();

			}
		}
	}
}

PaintModel.prototype.DeleteSelectedItems=function(selection){
for(var i in this.selectedItems)
	this._items.splice(this.selectedItems[i],1);
    this.itemUpdated.notify();
}
