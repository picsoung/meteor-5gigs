if (Meteor.isClient) {
  L.Icon.Default.imagePath = 'packages/leaflet/images'

  Template.searchForm.events({
    'click #searchButton' : function (event) {
      Meteor.call('search5gig', $("#cityName").val(),$("#country").val(),function(err,data){
        if(err)
          return err;

        if(data != "The city you requested doesn't exist"){
          data.forEach(function (concert) {
            var marker = L.marker([concert.venue.location.latitude, concert.venue.location.longitude]).addTo(map);
            marker.bindPopup("<b><a href='"+concert.url+"'>"+concert.name+"</a></b><br><b>Date </b>"+concert.startDate);
          });

          Session.set('city', $("#cityName").val());
          Session.set('concerts',data);
        }else{
          FlashMessages.sendError("City doesn't exist or was not found on 5gig, try local spelling",{ hideDelay: 4000 });
        }
      });

      Meteor.call('getGeoCoordinates',$("#cityName").val(),$('#country :selected').text(),function(err,data){
        if(err)
          return err

        Session.set('coordinates',data);
        map.setView(new L.LatLng(data.lat, data.lon), 13) 
      });

      event.preventDefault();
    }
  });

  Template.concert.events({
    'click #seemap' : function (event){
      var concert = this;
      map.setView(new L.LatLng(concert.venue.location.latitude, concert.venue.location.longitude), 20)
    }
  });


  Template.maptemplate.rendered = function () {
    var lat = Session.get('coordinates') ? Session.get('coordinates').lat : 47;
    var lon = Session.get('coordinates') ? Session.get('coordinates').lon : 20;
    var zoom = 5;
    window.map = L.map('map').setView([lat, lon], zoom);
    L.tileLayer('http://{s}.tile.cloudmade.com/139c31bba7f14a5bba50e9ae3f9802fc/997/256/{z}/{x}/{y}.png?token=96f4ae8a17f5435ca8adcc322e29058d', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(window.map);
  };

  Template.eventsMap.helpers({
    concerts: function () {
      return Session.get('concerts');
    },
    city: function() {
      return Session.get('city');
    }
  });

  Handlebars.registerHelper("prettifyDate", function(timestamp) {
    var date = moment(timestamp);
    return moment(date).format("MMM Do YY");
});

}