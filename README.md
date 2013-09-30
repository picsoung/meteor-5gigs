meteor-5gig
==============

Example project of [5gig](http://www.5gig.com) API in meteor.

5gig let's you find out concert and ticket information for your favorite bands and artists.

5gig's API is propulsed by [3scale](http://3scale.net).

[Full 5gig API doc](http:/www.5gig.com/api/)

## Dependencies

* npm
* [meteor](http://meteor.com)
* [leaflet](http://leafletjs.com/)
* [moment js](https://momentjs.com)

## Usage

1. Put your 5gig API key and Cloudmade (to generate the map) in the _settings.json_ file.
2. Launch the app using the command:
   ```
    meteor --settings settings.json
   ```

## What it does

Search for concerts on 5gig depending on a city name.

1. Write city name
2. Select country
3. Concerts are listed and appear on the map

