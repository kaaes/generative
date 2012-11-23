function Particle() {
	if (typeof Vector !== 'function') {
		throw new Error('Vector is necessary for Particle well being!');
	}

  this.position = new Vector();
  this.velocity = new Vector();
  this.acceleration = new Vector();

  this.radius = 1;
}

Particle.prototype.setPosition = function(x, y) {
  this.position.x = x;
  this.position.y = y;
}

Particle.prototype.setVelocity = function(x, y) {
  this.velocity.x = x;
  this.velocity.y = y;
}

Particle.prototype.update = function(ctx) {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);

  this.draw(ctx);

  // if (this.position.x + this.radius * 0.5 >= window.innerWidth) {
  //   this.velocity.x *= -1;
  // }

  // if (this.position.y + this.radius * 0.5 >= window.innerHeight) {
  //   this.velocity.y *= -1;
  // }

  // if (this.position.x + this.radius * 0.5 <= 0) {
  //   this.velocity.x *= -1;
  // }

  // if (this.position.y + this.radius * 0.5 <= 0) {
  //   this.velocity.y *= -1;
  // }
};

Particle.prototype.draw = function(ctx) {
  ctx.save();
  ctx.fillStyle = 'rgba(243,91,82,.9)';
  ctx.translate(this.position.x, this.position.y);
  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}