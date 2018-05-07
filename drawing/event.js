/**
 * [Paint description]
 * Paint Class creates new instances of model,view,controller of paint.
 */
function Paint(){

	var elements={
		  'DrawingPad': $('#MyCanvas'),
		  'SelectionCanvas': $('#MyCanvas2'),
          'CircleButton': $('#CircleBtn'),
          'RectangleButton': $('#RectangleBtn'),
          'DeleteButton': $('#DeleteBtn'),
          'SelectionButton': $('#SelectionBtn')
	}

	var model= new PaintModel;
	var view = new PaintView(model,elements);
	var controller= new PaintController(model,view);  

} 



function Event(thisOfsender) {
    this.SenderThis = thisOfsender;
    this._listeners = [];
}

Event.prototype = {
    attach: function (listener) {
        this._listeners.push(listener);
    },
    notify: function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this.SenderThis, args);
        }
    }
};


