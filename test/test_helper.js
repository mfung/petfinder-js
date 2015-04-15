process.env.NODE_ENV = 'test';
var dotenv           = require('dotenv');
global.http          = require('http');
var chai             = require('chai');

chai.config.includeStack = true;

global.expect         = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion      = chai.Assertion;
global.assert         = chai.assert;
Replay                = require('Replay');

dotenv.load();

global.API_KEY    = process.env.API_KEY || 'some_username';
global.API_SECRET = process.env.API_SECRET || 'some_password';
global.petfinder  = require('../lib/petfinder')(API_KEY, API_SECRET);
global.expect     = require('chai').expect;