var President = Backbone.Model.extend({
    defaults : {
        name: "",
        surname: "",
        rate: 0
    }

});

var PresidentsCollection = Backbone.Collection.extend({
    model: President
});

var collection1 = new PresidentsCollection([
    {name : "George", surname: "Washington", rate: 9},
    {name: "John", surname: "Kennedy", rate: 8},
    {name: "Harry", surname: "Truman", rate: 7},
    {name: "Franklin", surname: "Roosevelt", rate: 6},
    {name: "Richard", surname: "Nixon", rate: 5},
    {name: "Abraham", surname: "Lincoln", rate: 8},
    {name: "James", surname: "Carter", rate: 4},
    {name: "Gerald", surname: "Ford", rate: 5},
    {name: "George", surname: "Bush", rate: 7},
    {name: "Bill", surname: "Clinton", rate: 7},
    {name: "Barack", surname: "Obama", rate: 9}
]);

var PresidentCollection = Backbone.View.extend({
    tagName: 'tr',
    render: function(){
        this.$el.html(`<td>${this.model.attributes.name}</td>
                        <td>${this.model.attributes.surname}</td>
                        <td>${this.model.attributes.rate}</td>`);
        return this;
    }
});

var CollectionView = Backbone.View.extend({
    tagName : 'table',
    render : function(){
        this.model.models.forEach((model)=>{
            this.$el.append(new PresidentCollection({"model": model}).render().$el);
        });
        return this;
    }
});
$('#main').html(new CollectionView({model: collection1}).render().$el);

var FormView = Backbone.View.extend({
    tagName: 'form',
    render: function(){
        this.$el.html(`<input type = "text" name="name" placeholder="First name">
                        <input type = "text" name="surname" placeholder="Last name">
                        <input type = "text" name="rate" placeholder="Rate">
                        <button type = "submit">Submit</button>`);
        return this;
    },
    events: {
        'submit': 'onSubmit'
      },
      onSubmit: function() {
          event.preventDefault();
          var newPresident = new President();
          newPresident.set({
              name: $('input[name = name]')[0].value,
              surname: $('input[name = surname]')[0].value,
              rate: $('input[name = rate]')[0].value
          });

          var found = collection1.find(function(item){
              return (item.get('surname') === newPresident.get('surname')
                  && item.get('name') === newPresident.get('name'))
          });

          if (found) {
              found.set('rate', newPresident.get('rate'));
          } else {
              collection1.push(newPresident);
          }

          $('#main').html(new CollectionView({model: collection1}).render().$el);
      }
});

$('#form').html(new FormView().render().$el);
