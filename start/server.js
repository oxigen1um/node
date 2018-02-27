var log = require('logger')(module);
var db = require('db');


var User = require('./user');

function run() {
 var vasya = new User("Вася");
 var petya = new User("Петя");

 vasya.hello(petya);

 log(db.getPhrase("welcome"));
}

if (module.parent) {
  exports.run = run; // module exports
} else {
  run(); // run module if didn't run even
}
