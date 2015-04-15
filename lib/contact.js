"use strict";

var Contact = function(data) {
  this.email        = data.email['$t'];
  this.phone        = data.phone['$t'];
  this.fax          = data.fax['$t'];
  this.address1     = data.address1['$t'];
  this.address2     = data.address2['$t'];
  this.city         = data.city['$t'];
  this.state        = data.state['$t'];
  this.zip          = data.zip['$t'];
  return this;
};

module.exports = Contact;