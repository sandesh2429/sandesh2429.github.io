var DayView = Backbone.View.extend({
		
	li : 'div',	
	className: "temp",	

	template : _.template('<div><%= date %> </div>'),

	initialize : function(){
	
	},
	events : {
		
	}
});

var CalenderView = Backbone.View.extend({
				
	el: '.container',
	
	template: _.template($('#item-template').html()),

	events:{
    'click .nextBtn':'RenderNextMonth',
    'click .backBtn':'RenderPrevMonth',

    },
	
	
	initialize : function(){			
		
		//today date view for this
		this.date = new Date();
		this.currentDate = new Date();	
		this.$monthName = this.$('#month-name');
		this.$yearName = this.$('#year-name');
		this.$dateDiv = this.$('#dates');
		this.days = [new DayView({})];
        this.render();
        this.firstDay;
	},

	render: function(){
		$("body").append(this.$el);
		this.$el.html(this.template(this.obtainData()));
		this.renderCalendar();
	},
	RenderNextMonth: function(){
		this.model.currentDate.setMonth(this.model.currentDate.getMonth());
		this.render();

	},
	RenderPrevMonth: function(){
		this.model.currentDate.setMonth(this.model.currentDate.getMonth()-2);
		this.render();
		
	},
	renderCalendar: function(){
		this.getFirstDay();
		this.firstDay = this.getFirstDay();
		console.log(this.firstDay);
		/*this.dayModel = new DayModel();
		this.dayView = new DayView({ model: this.dayModel });*/
		var tempFirstRenderDate=2-this.firstDay;
		if(this.firstDay==0){
			tempFirstRenderDate=tempFirstRenderDate-7;
		}
		this.model.currentDate.setDate(tempFirstRenderDate);

		for(var i=1-tempFirstRenderDate; i>0; i--){
			$("#dates").append("<div class= 'PrevMonthDates'>"+this.model.currentDate.getDate()+"</div>");
			this.nextDateToRender = this.model.currentDate.getDate()+1; 
			this.model.currentDate.setDate(this.nextDateToRender);
        }

        this.totalDays = new Date (this.model.currentDate.getFullYear(),this.model.currentDate.getMonth()+1,0).getDate();

        for(var i=1; i<=this.totalDays; i++){

        	if(this.model.currentDate.getDate() == this.date.getDate() && this.model.currentDate.getMonth() == this.date.getMonth() && this.model.currentDate.getFullYear() == this.date.getFullYear()){
        		$("#dates").append("<div class='TodayDate'>"+this.model.currentDate.getDate()+"</div>");

        	  }else{
				   $("#dates").append("<div class= 'MonthDates'>"+this.model.currentDate.getDate()+"</div>");
			}

				this.nextDateToRender = this.model.currentDate.getDate()+1; 
				this.model.currentDate.setDate(this.nextDateToRender);
        }


	},
	obtainData : function(){
		var month = new Array();
				month[0] = "January";
				month[1] = "February";
				month[2] = "March";
				month[3] = "April";
				month[4] = "May";
				month[5] = "June";
				month[6] = "July";
				month[7] = "August";
				month[8] = "September";
				month[9] = "October";
				month[10] = "November";
				month[11] = "December";

		var data = {
				month : month[this.model.currentDate.getMonth()],
				date : this.model.currentDate.getDate(),
				year : this.model.currentDate.getFullYear()
			}
			return data;
	},
	getFirstDay: function(){
			this.model.currentDate.setDate(1);	
			//console.log(this.date);
			return this.model.currentDate.getDay();
	}
});	
		
//instance creation
//debugger;	
//dayCollection = new DayCollection();
//var dayModel = new DayModel();
var calenderModel = new CalenderModel();
var calenderView = new CalenderView({ model: calenderModel });