function Particle(x, y) {
  if (typeof Vector !== 'function') {
    throw new Error('Vector is necessary for Particle well being!');
  }

  this.position = new Vector(x, y);
  this.velocity = new Vector();

  this.radius = 1;
  this.mass = 1;
  this.maxSpeed = 0;

  this.fillColor = 'black';
}

Particle.G = 1;

Particle.prototype.setPosition = function(x, y) {
  this.position.x = x;
  this.position.y = y;
};

Particle.prototype.setVelocity = function(x, y) {
  this.velocity.x = x;
  this.velocity.y = y;
};

Particle.prototype.addForce = function(force) {
  this.velocity.add(force);

  if (this.maxSpeed && this.velocity.magnitude() > this.maxSpeed) {
    this.velocity.normalize();
    this.velocity.mult(this.maxSpeed);
  }
};

Particle.prototype.update = function(ctx) {
  this.position.add(this.velocity);

  if (this.radius < 0) {
    this.radius = 0;
  }

  //this.draw(ctx);

  if (this.constrainToWindow) {

    if (this.position.x + this.radius >= window.innerWidth) {
      this.velocity.x *= -1;
    }

    if (this.position.y + this.radius >= window.innerHeight) {
      this.velocity.y *= -1;
    }

    if (this.position.x <= this.radius) {
      this.velocity.x *= -1;
    }

    if (this.position.y <= this.radius) {
      this.velocity.y *= -1;
    }

  }
};

Particle.prototype.draw = function(ctx) {
  ctx.save();
  ctx.fillStyle = this.fillColor;
  ctx.translate(this.position.x, this.position.y);
  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

Particle.prototype.attract = function(mover) {
  var force = Vector.sub(this.position, mover.position);
  var distance = force.magnitude();

  distance = distance < 5 ? 5 : distance > 50 ? 50 : distance;

  force.normalize();
  var strength = (Particle.G * this.mass * mover.mass) / (distance * distance);

  force.mult(strength);

  return force;
};
