(function() {

  String.prototype.humanize = function() {
    var humanWord, nonHumanWord;
    nonHumanWord = this;
    nonHumanWord = nonHumanWord.replace(/\W\w/g, function(match) {
      return ' ' + match[1].toUpperCase();
    });
    humanWord = nonHumanWord.replace(/([a-z])/, function($1) {
      return $1.toUpperCase();
    });
    return humanWord;
  };

}).call(this);
