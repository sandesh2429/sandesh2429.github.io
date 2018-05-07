var app = {};
i=1;
//Model
app.Todo = Backbone.Model.extend({
defaults: {
   title:'',
   completed:false
    }
});
//Collection
app.TodoList = Backbone.Collection.extend({
  model: app.Todo,
  localStorage: new Store("backbone-todo"),
  completed:function(){
    return this.filter(function(model){
      return model.get('completed')
    })
  }

});

//ModelView
app.TodoView = Backbone.View.extend({
  tagName: 'li', 
  template: _.template($('#item-template').html()),

  initialize: function(){

    this.model.on('destroy',this.remove,this);
   // this.model.on('change:title',this.render,this);
  },
  events:{
    'click .remove':'removeTodo',
    'change .checkbox' :'changeStatus',
    'dblclick .todolabel':'editTodo'
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this.$el;
   },
   removeTodo: function(){
    this.model.destroy();
   },
    changeStatus: function(e){
   
      this.model.set({completed: e.target.checked})
      this.status=this.model.get('completed');
    
      if(this.status){
         this.$('.todolabel').addClass('dashedlabel');
       }else{ this.$('.todolabel').removeClass('dashedlabel');}
   },
    editTodo: function(){
      this.$('.todolabel').hide(); 
       this.$('.checkbox').hide(); 
      var inputview = new app.inputView({model : this.model});
      this.$('.checkbox').after(inputview.render());//renders inputbox with previous value.
      inputview.$input.focus();

      inputview.on('removed', function(e){
        this.$('.todolabel').html(this.model.get('title'));
        this.$('.todolabel').show();
        this.$('.checkbox').show();
      }, this)

    }


});

app.inputView = Backbone.View.extend({

  tagName : 'span',

  template : _.template("<input type='text'></input>"),

  initialize : function(){
    this.$el.append(this.template);
    this.$input = this.$('input');
    this.$input.val(this.model.get('title'));    
    
  },

  events : {
    'keypress input' : 'replace'
  },

  replace : function(e){
    if ( e.which !== 13 || !this.$("input").val().trim() ) {
      return;
    }
   // console.log(this.$("input").val().trim())
    this.model.set('title',this.$input.val().trim());
    this.remove();
    this.trigger('removed');

  },
  render: function(){
    return this.$el;
  }
})

//CollectionView
app.AppView = Backbone.View.extend({

el:'#todoapp',

initialize: function () {
    this.input = this.$('#new-todo');
    var _this = this;
  
    this.collection.on('add', function(e){
        _this.makeTodo(e);
      });

},

events: {
    'keypress #new-todo': 'addtodo',
    'click #RemoveCompleted':'removeCompleted'

   },

addtodo: function(e){

 if ( e.which !== 13 || !this.input.val().trim() ) {  
      return;
  }

var data = {
        title : this.input.val().trim(),
       completed: false
      };       
       this.collection.add(data);
       //console.log(this.collection);             
    this.input.val('');
},

render: function(){

},
makeTodo: function(e){
  todo = new app.TodoView({model: e});
  $('#todo-list').append(todo.render());
},
removeCompleted:function(){  
  /* this.collection.each(function(e){
    console.log(e.get('completed'));

    if(e.get('completed')){
     
    console.log(i);
     i++;
      e.destroy();
    }
   })*/
   _.invoke(this.collection.completed(), 'destroy');

}
    
});

//instance creation
app.todoList = new app.TodoList();
app.appview = new app.AppView({ collection: app.todoList });


