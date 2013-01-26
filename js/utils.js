var utils = {
  random: function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  },

  rad: function(angle) {
    return angle * Math.PI/180;
  }
}