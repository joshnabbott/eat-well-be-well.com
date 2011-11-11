(function() {
  String.prototype.humanize = function() {
    var humanWord, nonHumanWord;
    nonHumanWord = this;
    humanWord = nonHumanWord.split(/[^a-zA-Z]/);
    humanWord = humanWord.filter(function(element) {
      return element !== '';
    });
    humanWord = humanWord.map(function(word) {
      return word.replace(/([a-zA-Z])/, function($1) {
        return $1.toUpperCase();
      });
    });
    humanWord = humanWord.join(' ');
    return humanWord;
  };
}).call(this);
