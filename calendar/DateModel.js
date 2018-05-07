/*var DayModel = Backbone.Model.extend({
    defaults: 
    {
        date: new Date()

    },

    initialize: function() {

    },
    getCurrentDay: function() {
        return this.get('date').getDay();
    },
    getCurrentDate: function() {
        return this.get('date').getDate();
    },
    getCurrentMonth: function() {
        return this.get('date').getMonth()
    }
});

*/
/*var DateCollection = Backbone.Collection.extend({

    Model: DayModel,

    initialize: function() {

    }
});
*/

var CalenderModel = Backbone.Model.extend({
  /*  "defaults": function() {
        return {
            "date": new Date(),
            "currentDate": new Date(),
            "days": []
        },*/

        defaults:
        {
            month : ["January","February","March","April","May","June","July","August","September","October","November","December"],
            
            
        },
        
      initialize : function(){
      	this.currentDate = new Date();
      }
        
   
});
