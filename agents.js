(function() {
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.globalAlpha = .07;
  //ctx.globalCompositeOperation = 'lighter';
  ctx.lineWidth = 1;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = '#FDDC89';

  var res = 15;
  var angle = utils.rad(360/res);
  var p = [];
  var rp = [];
  var radius = 120;
  var step = 5;
  var scale = .5;

  var last = p.length - 1;

  var center = {
    x: canvas.width/2,
    y: canvas.height/2
  }

  var mouse = {
    x: center.x,
    y: center.y
  }

  function setup() {
    var x, y, v;
    for (var i = 0; i < res; i++) {
      x = Math.cos(angle * i) * radius;
      y = Math.sin(angle * i) * radius;
      v = new Vector(x, y);
      p.push(v);
      rp.push(new Vector(x, y));
    }

    last = p.length - 1;
  }

  function draw() {
    place(mouse.x, mouse.y);
  }

  function place() {

    var v = new Vector(mouse.x - center.x, mouse.y - center.y);
    var m = Math.floor(v.magnitude());

    m = m > 15 ? 15 : m;

    for (var i = 0; i < m; i++) {
      var vel = new Vector(mouse.x - center.x, mouse.y - center.y);
      //scale = ~~vel.magnitude() / 500;
      //scale = scale > 1.5 ? 1.5 : scale < .5 ? .5 : scale;
      vel.normalize();
      center.x += vel.x;
      center.y += vel.y;

      shape();
    }
  }


  function shape(mouseX, mouseY) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.strokeStyle = 'hsl( ' + ((Math.sin(counter / 50) * 10) + 40) + ', 100%,50%)';

    ctx.translate(center.x, center.y);

    ctx.beginPath();
    ctx.save();
    ctx.scale(scale, scale);
    var cp = {
      x: (p[last].x + p[0].x) / 2,
      y: (p[last].y + p[0].y) / 2
    }
    ctx.moveTo(cp.x, cp.y);

    for (var i = 0, l = p.length; i < l; i++) {;
      var d = new Vector(
        utils.random(-step, step),
        utils.random(-step, step)
      );
      d.normalize();

      var np = Vector.add(p[i], d);

      if (Math.abs(np.x - rp[i].x) > radius/4 ||
          Math.abs(np.y - rp[i].y) > radius/4) {

      } else {
        p[i].add(d);
      }

      if (p[i + 1]) {
        cp = {
          x: (p[i].x + p[i + 1].x) / 2,
          y: (p[i].y + p[i + 1].y) / 2
        }
      } else {
        cp = {
          x: (p[i].x + p[0].x) / 2,
          y: (p[i].y + p[0].y) / 2
        }
      }
      ctx.quadraticCurveTo(
        p[i].x,
        p[i].y,
        cp.x,
        cp.y
        );
    }
    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  setup();

  counter = 0;

  var anim = new AnimationFrame(function() {
    draw(); 
    counter++;     
  });

  document.body.addEventListener('mousedown', startDrawing);
  document.body.addEventListener('mouseup', stopDrawing);

  function startDrawing(evt) {
    document.body.addEventListener('mousemove', doDraw); 
    document.body.addEventListener('keydown', changeBrush); 

    center.x = evt.clientX + 10;
    center.y = evt.clientY + 10;

    doDraw(evt);
  }

  function stopDrawing(evt) {
    document.body.removeEventListener('mousemove', doDraw); 
    document.body.removeEventListener('keydown', changeBrush); 
  }

  function doDraw(evt) {
    mouse.x = evt.clientX;
    mouse.y = evt.clientY;
  }

  function changeBrush(evt) {
    switch (evt.keyCode) {
      case 221:
        if (scale < 1) scale += 0.01;
        break;

      case 219:
        if (scale > 0.1) scale -= 0.01;
        break;

      default:
        break;
    }
  }
})();