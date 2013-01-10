function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

/* static methods */
Vector.add = function(v1, v2) {
  return new Vector(v1.x + v2.x, v1.y + v2.y);
};

Vector.sub = function(v1, v2) {
  return new Vector(v1.x - v2.x, v1.y - v2.y);
};

Vector.mult = function(v, scale) {
  return new Vector(v.x * scale, v.y * scale);
};

Vector.div = function(v, scale) {
  return Vector.mult(v, 1 / scale);
};

Vector.angle = function(v1, v2) {
  return Math.atan2(v2.y - v1.y, v2.x - v1.x);
}

/* dynamic methods */
Vector.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
};

Vector.prototype.sub = function(v) {
  this.x -= v.x;
  this.y -= v.y;
};

Vector.prototype.mult = function(scale) {
  this.x *= scale;
  this.y *= scale;
};

Vector.prototype.div = function(scale) {
  this.x /= scale;
  this.y /= scale;
};

/* the length of the vector */
Vector.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

/* vector coords for magnitude 1 */
Vector.prototype.normalize = function() {
  var m = this.magnitude();
  if (m) this.div(m);
};

Vector.prototype.copy = function() {
  return new Vector(this.x, this.y);
};

Vector.prototype.angle = function() {
  return Math.atan2(this.y, this.x);
}



