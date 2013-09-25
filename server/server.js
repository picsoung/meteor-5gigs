if (Meteor.isServer) {
  Meteor.startup(function () {
  	var appKey =Meteor.settings.gig_app_key;
  	var cloudmadeKey = Meteor.settings.cloudmade_app_key;

    Meteor.methods({
	  	search5gig: function(city, country_iso){
	        var request_uri = "http://www.nvivo.es/api/request.php?api_key="+appKey+"&method=city.getEvents&city="+city+"&country_iso="+country_iso+"&format=json";
	        var result = HTTP.call("GET",request_uri);
			if (result.statusCode === 200) {
			  var respJson = JSON.parse(result.content);
			  if(respJson.status==='error')
			  	return respJson.error.message
			  
			  return respJson.response.gigs
			}else {
			  return "ERROR in the request"
			}
	  	},

	  	getGeoCoordinates: function(city,country){
	  		var request_uri = "http://beta.geocoding.cloudmade.com/v3/"+cloudmadeKey+"/api/geo.location.search.2?format=json&source=OSM&enc=UTF-8&limit=1&q=[country="+country+"]%20"+city+"&token=96f4ae8a17f5435ca8adcc322e29058d";
	  		var result = HTTP.call("GET",request_uri);

	  		if (result.statusCode === 200) {
			  var respJson = JSON.parse(result.content);
			  var place = respJson.places[0];
			  return place.position
			}else {
			  return "No result"
			}
	  	}
	  });
  });

  
}
