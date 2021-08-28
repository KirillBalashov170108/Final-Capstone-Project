class Computer {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };
    this.body = Bodies.rectangle(x, y, width, height, options);

    this.width = width;
    this.height = height;
    this.image = loadImage("./assets/cowbow.png");

    this.life1 = "lime";
    this.life2 = "lime";
    this.life3 = "lime";

    World.add(world, this.body);
  }
  life() {
    push();
    textSize(20);
    fill("white");
    text("Computer", width - 310, 40);

    fill(this.life1);
    rect(width - 420, 50, 70, 30);
    fill(this.life2);
    rect(width - 350, 50, 70, 30);
    fill(this.life3);
    rect(width - 280, 50, 70, 30);
    pop();
  }
   reduceLife(cowboyLife) {
    if (cowboyLife === 2) {
      this.life1 = "red";
    }
    if (cowboyLife === 1) {
      this.life2 = "red";
    }
    if (cowboyLife === 0) {
      this.life3 = "red";
    }
  }
  display() {
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