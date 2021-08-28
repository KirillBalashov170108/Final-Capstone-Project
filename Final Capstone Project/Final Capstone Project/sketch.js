const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var canvas;
var engine, world;
var player, playerBase, PlayerCowboy;
var computer, computerBase, ComputerCowboy;
var playerBullets = [];
var computerBullets = [];
var playerCowboyLife = 3;
var computerCowboyLife = 3;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerCowboy = new PlayerCowboyP(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );
  computerBase = new ComputerBase(
    width - 300,
    random(450, height - 300),
    180,
    150
  );
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );
  computerCowboy = new ComputerCowboyC(
    width - 350,
    computerBase.body.position.y - 180,
    120,
    120
  );
  handleComputerCowboy();
}
function draw() {
  background(backgroundImg);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("COWBOY WAR", width / 2, 100);

  for (var i = 0; i < playerBullets.length; i++) {
    showBullets(i, playerBullets);
  }

  playerBase.display();
  player.display();
  player.life();
  playerCowboy.display();
  handlePlayerBulletCollision();

  for (var i = 0; i < computerBullets.length; i++) {
    showBullets(i, computerBullets);
  }

  computerBase.display();
  computer.display();
  computer.life();
  computerCowboy.display();
  handleComputerBulletCollision();
}
function keyPressed() {
  if (keyCode === 32) {
    var posX = playerCowboy.body.position.x;
    var posY = playerCowboy.body.position.y;
    var angle = playerCowboy.body.angle;

    var bullet = new PlayerBullet(posX, posY, 100, 10, angle);

    bullet.trajectory = [];
    Matter.Body.setAngle(bullet.body, angle);
    playerBullets.push(bullet);
  }
}
function keyReleased() {
  if (keyCode === 32) {
    if (playerBullets.length) {
      var angle = playerCowboy.body.angle;
      playerBullets[playerBullets.length - 1].shoot(angle);
    }
  }
}
function showBullets(index, bullets) {
  bullets[index].display();
  if (
    bullets[index].body.position.x > width ||
    bullets[index].body.position.y > height
  ) {
    if (!bullets[index].isRemoved) {
      bullets[index].remove(index, bullets);
    } else {
      bullets[index].trajectory = [];
    }
  }
}
function handleComputerCowboy() {
  if (!computerCowboy.collapse && !playerCowboy.collapse) {
    setTimeout(() => {
      var pos = computerCowboy.body.position;
      var angle = computerCowboy.body.angle;
      var moves = ["UP", "DOWN"];
      var move = random(moves);
      var angleValue;

      if (move === "UP" && computerCowboy.body.angle < 1.67) {
        angleValue = 0.1;
      }else{
          angleValue = -0.1;
      }
      if(move === "DOWN" && computerCowboy.body.angle > 1.47) {
        angleValue = -0.1;
      }else{
          angleValue = 0.1;
      }
      
      angle += angleValue;

      var bullet = new ComputerBullet(pos.x, pos.y, 100, 10, angle);

      Matter.Body.setAngle(computerCowboy.body, angle);
      Matter.Body.setAngle(computerCowboy.body, angle);

      computerBullets.push(bullet);
      setTimeout(() => {
        computerBullets[computerBullets.length - 1].shoot(angle);
      }, 100);

      handleComputerCowboy();
    }, 2000);
  }
}
function handlePlayerBulletCollision() {
  for (var i = 0; i < playerBullets.length; i++) {
    var baseCollision = Matter.SAT.collides(
      playerBullets[i].body,
      computerBase.body
    );
    var cowboyCollision = Matter.SAT.collides(
      playerBullets[i].body,
      computerCowboy.body
    );
    var computerCollision = Matter.SAT.collides(
      playerBullets[i].body,
      computer.body
    );
      if (
      baseCollision.collided ||
      cowboyCollision.collided ||
      computerCollision.collided
    ) {
      computerCowboyLife -= 1;
      computer.reduceLife(computerCowboyLife);
      if (computerCowboyLife <= 0) {
        computerCowboy.collapse = true;
        Matter.Body.setStatic(computerCowboy.body, false);
        Matter.Body.setStatic(computer.body, false);
        Matter.Body.setPosition(computer.body, {
          x: width - 100,
          y: computer.body.position.y
        });
      }
    }
  }
}
function handleComputerBulletCollision() {
  for (var i = 0; i < computerBullets.length; i++) {
    var baseCollision = Matter.SAT.collides(
      computerBullets[i].body,
      playerBase.body
    );
    var cowboyCollision = Matter.SAT.collides(
      computerBullets[i].body,
      playerCowboy.body
    );
    var playerCollision = Matter.SAT.collides(
      computerBullets[i].body,
      player.body
    );
      if (
      baseCollision.collided ||
      cowboyCollision.collided ||
      playerCollision.collided
    ) {
      playerCowboyLife -= 1;
      player.reduceLife(playerCowboyLife);
      if (playerCowboyLife <= 0) {
        playerCowboy.collapse = true;
        Matter.Body.setStatic(playerCowboy.body, false);
        Matter.Body.setStatic(player.body, false);
        Matter.Body.setPosition(player.body, {
          x: 100,
          y: player.body.position.y
        });
      }
    }
  }
}
