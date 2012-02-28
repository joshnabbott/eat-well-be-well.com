(function() {

  String.prototype.humanize = function() {
    var humanWord, nonHumanWord;
    nonHumanWord = this;
    nonHumanWord = nonHumanWord.replace(/\W\w/g, function(match) {
      return ' ' + match[1].toUpperCase();
    });
    humanWord = nonHumanWord.replace(/^\w/, function(eff) {
      return eff.toUpperCase();
    });
    return humanWord;
  };

}).call(this);
