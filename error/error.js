const util = require('util');

var phrases = {
  "Hello": "Привет",
  "world": "мир"
};
// create an error object
function PhraseError(message) {
  this.message = message;
  Error.captureStackTrace(this, PhraseError); // get error stack. Second param sets function before which collecting StackTrace
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HttpError(status, message) {
  this.status = status;
  this.message = message;
  Error.captureStackTrace(this, HttpError);  // yet another stack trace collection
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


function getPhrase(name) {
  if (!phrases[name]) {
    throw new PhraseError("Нет такой фразы: " + name); // HTTP 500, attention!
  }
  return phrases[name];
}

function makePage(url) {
  if (url != 'index.html') {
    throw new HttpError(404, "Нет такой страницы"); // HTTP 404
  }
  return util.format("%s, %s!", getPhrase("Hello"), getPhrase("world"));
}


try {
  var page = makePage('index.html');
  console.log(page);
}
catch (e) {
  if (e instanceof HttpError) {
    console.log(e.status, e.message);
  } else {
    console.error("Ошибка %s\n сообщение: %s\n стек: %s", e.name, e.message, e.stack);
  }
}


// now it's ok
// change Hello world to create error
// change index.html name to create error
