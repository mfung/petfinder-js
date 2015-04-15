"use strict";

var Shelter = function(data) {
  this.id        = data.id['$t'];
  this.name      = data.name['$t'];
  this.email     = data.email['$t'];
  this.phone     = data.phone['$t'];
  this.fax       = data.fax['$t'];
  this.address1  = data.address1['$t'];
  this.address2  = data.address2['$t'];
  this.city      = data.city['$t'];
  this.state     = data.state['$t'];
  this.zip       = data.zip['$t'];
  this.country   = data.country['$t'];
  this.longitude = data.longitude['$t'];
  this.latitude  = data.latitude['$t'];

  return this;
};

module.exports = Shelter;