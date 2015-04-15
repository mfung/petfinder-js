"use strict";

var Contact = require('./contact');
var _       = require('lodash');

var Pet = function(data) {

  var contactParse = function(data) {
    var contact = new Contact(data);
    return contact;
  };

  var optionsParse = function(data) {
    var results =[];
    if (!data) return results;

    if (data && data.constructor === Array) {
      _.forEach(data, function(n) {
        results.push(n['$t']);
      });
    } else {
      results.push(data['$t']);
    }
    return results;
  };

  var breedsParse = function(data) {
    var results =[];
    if (!data) return results;

    if (data.constructor === Array) {
      _.forEach(data, function(n) {
        results.push(n['$t']);
      });
    } else {
      results.push(data['$t']);
    }

    return results;
  };

  var mediaParse = function(data) {
    var results = {};
    results['photos'] = {}

    if (!data) return results;

    // photos
    if (!data.photos) return results;

    var photos = data.photos.photo;

    if (photos) {
      var photoHash = {}
      _.forEach(photos, function(photo) {
        if (!(photo["@id"] in photoHash)) {
          photoHash[photo["@id"]] = {};
        }
        photoHash[photo["@id"]][photo["@size"]] = photo["$t"];
      });
      results['photos'] = photoHash;
    }

    return results;
  }

  this.id           = data.id['$t'];
  this.name         = data.name['$t'];
  this.status       = data.status['$t'];
  this.description  = data.description['$t'];
  this.sex          = data.sex['$t'];
  this.age          = data.age['$t'];
  this.size         = data.size['$t'];
  this.mix          = data.mix['$t'];
  this.animal       = data.animal['$t'];
  this.shelterId    = data.shelterId['$t'];
  this.shelterPetId = data.shelterPetId['$t'];
  this.contact      = contactParse(data.contact);
  this.options      = optionsParse(data.options.option);
  this.breeds       = breedsParse(data.breeds.breed);
  this.media        = mediaParse(data.media)
  return this;
};

module.exports = Pet;