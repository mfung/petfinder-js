"use strict";

var package_json    = require('./../package.json');
var _               = require('lodash');
var request         = require('request');
var querystring     = require('querystring');
var crypto          = require('crypto');

var Pet             = require('./pet');
var Shelter         = require('./shelter');

var Petfinder = function(api_key, api_secret, options) {

  if( !(this instanceof Petfinder) ) {
    return new Petfinder(api_key, api_secret, options);
  }

  var _this          = this;
  this.options       = options || {};

  // do this to mantain similarity to other libs
  var uriParts = {};
  uriParts.protocol = this.options.protocol || "http";
  uriParts.host = this.options.host || "api.petfinder.com";
  uriParts.port = this.options.port || "";
  delete this.options.protocol;
  delete this.options.host;
  delete this.options.port;
  this.options.uriParts = uriParts;

  this.options.uri = this.options.uri || uriParts.protocol + "://" +
                     uriParts.host + (uriParts.port ? ":" + uriParts.port : "");

  var _signature = function() {
    return crypto.createHash('md5')
                 .update(this.api_secret + 'key=' + this.api_key + '&format=json')
                 .digest('hex');
  };

  var _get = function(method, parameters, callback) {
    var uri = this.options.uri + '/' + method + '?format=json&key=' +
              this.api_key + '&' + querystring.stringify(parameters);
    request(uri, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        callback(err, body || {});
      }
    });
  };

  /*
   * Not actually used unless we need to post I have noticed getToken does not
   * work with format=json must revert to xml if going to use.
   */
  var getToken = function() {
    _get.bind(this)('auth.getToken',{}, function(err, body){});
  }

  /*
   * animal is required [barnyard, bird, cat, dog, horse, pig, reptile,
   * smallfurry]
   * useage:
   * getBreedList('dog', function(error, breedList){console.log(breedList);});
   */

  var getBreedList = function(animal, callback) {
    if(!animal || animal === '') return callback(new Error('Must supply animal type.'), null);

    _get.bind(this)('breed.list',{"animal":animal}, function(err,body){
      var json = JSON.parse(body);
      var breedArray = _.transform(json.petfinder.breeds.breed, function(result, n) {result.push(n['$t']);});
      callback(err, breedArray);
    });
  };

  var getPet = function(petId, options, callback) {
    if(!petId || petId === '') return callback(new Error('Must supply pet id.'), null);
    options['id'] = petId;

    _get.bind(this)('pet.get', options, function(err, body) {
      var json = JSON.parse(body);
      callback(err, new Pet(json.petfinder.pet));
    });
  };

  var getRandomPet = function(options, callback) {
    options['output'] = options['output'] || 'full';

    _get.bind(this)('pet.getRandom', options, function(err, body) {
      var json = JSON.parse(body);
      callback(err, new Pet(json.petfinder.pet));
    });
  };

  var findPet = function(location, options, callback) {
    if(!location || location === '') return callback(new Error('Must supply location.'), null);

    options['location'] = location;
    options['output'] = options['output'] || 'full';

    _get.bind(this)('pet.find', options, function(err, body) {
      var json = JSON.parse(body);
      var pets = [];
      for (var index in json.petfinder.pets.pet) {
        pets.push(new Pet(json.petfinder.pets.pet[index]));
      }
      callback(err, pets);
    });
  };

  var findShelter = function(location, options, callback) {
    if(!location || location === '') return callback(new Error('Must supply location.'), null);
    options['location'] = location;

    _get.bind(this)('shelter.find', options, function(err, body) {
      var json = JSON.parse(body);
      var shelters = [];
      for (var index in json.petfinder.shelters.shelter) {
        shelters.push(new Shelter(json.petfinder.shelters.shelter[index]));
      }
      callback(err, shelters);
    });
  };

  var getShelter = function(shelterId, options, callback) {
    if(!shelterId || shelterId === '') return callback(new Error('Must supply shelter id.'), null);
    options['id'] = shelterId;

    _get.bind(this)('shelter.get', options, function(err, body) {
      var json = JSON.parse(body);

      var shelter = new Shelter(json.petfinder.shelter);
      callback(err, shelter);
    });
  };

  var getPetsInShelter = function(shelterId, options, callback) {
    if(!shelterId || shelterId === '') return callback(new Error('Must supply shelter id.'), null);
    options['id'] = shelterId;
    options['output'] = options['output'] || 'full';

    _get.bind(this)('shelter.getPets', options, function(err, body) {
      var json = JSON.parse(body);
      var pets = [];
      for (var index in json.petfinder.pets.pet) {
        pets.push(new Pet(json.petfinder.pets.pet[index]));
      }
      callback(err, pets);
    });
  };

  var getSheltersWithBreeds = function(animal, breed, options, callback) {
    if(!animal || animal === '') return callback(new Error('Must supply animal type.'), null);
    if(!breed || breed === '') return callback(new Error('Must supply breed.'), null);

    options['animal'] = animal;
    options['breed'] = breed;

    _get.bind(this)('shelter.listByBreed', options, function(err, body) {
      var json = JSON.parse(body);
      var shelters = [];

      for (var index in json.petfinder.shelters.shelter) {
        shelters.push(new Shelter(json.petfinder.shelters.shelter[index]));
      }
      callback(err, shelters);
    });
  };

  // public
  this.version               = package_json.version;
  this.api_key               = api_key;
  this.api_secret            = api_secret;
  this.options               = this.options;
  this.getToken              = getToken;
  this.getBreedList          = getBreedList;
  this.getPet                = getPet;
  this.getRandomPet          = getRandomPet;
  this.findPet               = findPet;
  this.findShelter           = findShelter;
  this.getShelter            = getShelter;
  this.getPetsInShelter      = getPetsInShelter;
  this.getSheltersWithBreeds = getSheltersWithBreeds;
  return this;
};

module.exports = Petfinder;
