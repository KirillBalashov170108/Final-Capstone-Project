class ComputerBullet {
  constructor(x, y, width, height, cowboyAngle) {
    var options = {
      restitution: 0.5,
      friction: 1.0,
      density: 1.0,
      isStatic: true
    };
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    this.image = loadImage("./assets/bullet.png");
    this.isRemoved = false;
    this.cowboyAngle = cowboyAngle;
    this.velocity = p5.Vector.fromAngle(cowboyAngle);
    World.add(world, this.body);
  }
  remove(index, bullets) {
    this.isRemoved = true;
    Matter.World.remove(world, this.body);
    bullets.splice(index, 1);
  }
  shoot(cowboyAngle) {
    this.velocity = p5.Vector.fromAngle(cowboyAngle + PI / 2);
    this.velocity.mult(32);
    Matter.Body.setVelocity(this.body, {
      x: this.velocity.x,
      y: this.velocity.y
    });

    Matter.Body.setStatic(this.body, false);
  }
  display() {
    var tmpAngle;
    if (this.body.velocity.y === 0) {
      tmpAngle = this.cowboyAngle + PI / 2;
    } else {
      tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x) - PI;
    }
    Matter.Body.setAngle(this.body, tmpAngle);

    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
