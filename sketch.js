var backgroundImg;
var spaceShip, spaceShipImg;
var bullet;
var bulletAttach = true;
var asteroidImg;
var asteroidGroup;
var gameState = 0;

function preload() {
    backgroundImg = loadImage("Images/Background Image.webp");

    spaceShipImg = loadImage("Images/Spaceship.png");
    asteroidImg = loadImage("Images/Asteroid.png");
}

function setup() {
    createCanvas(windowWidth - 30, windowHeight - 30);

    spaceShip = createSprite(windowWidth/2, windowHeight/2 + 170, 20, 20);
    spaceShip.addImage("spaceShip", spaceShipImg);
    spaceShip.scale = 0.45;

    bullet = createSprite(windowWidth/2, windowHeight/2 + 70, 10, 30);
    bullet.shapeColor = "yellow";
    bullet.visible = false;

    asteroidGroup = new Group();
}

function draw() {
    background(backgroundImg);

    if (gameState === 0) {

        if (keyDown("left")) {
            spaceShip.x = spaceShip.x - 3;
        }
        if (keyDown("right")) {
            spaceShip.x = spaceShip.x + 3;
        }

        if (keyDown("space")) {
            bullet.visible = true;

            bullet.velocityY = -3;

            bulletAttach = false;
        }
    
        if (keyDown("space") && bullet.y < windowHeight/2 + 70) {
            bullet.y = windowHeight/2 + 70;
            bullet.x = spaceShip.x;
        }

        if (bullet.y < 10) {
            bullet.visible = false;

            bullet.y = windowHeight/2 + 120;

            bulletAttach = true;
        }

        if (bulletAttach === true) {
            bullet.x = spaceShip.x;
        } else {
            bullet.x = bullet.x;
        }

        asteroids();

        if (asteroidGroup.isTouching(bullet)) {
            asteroidGroup.destroyEach();
        }
        if (asteroidGroup.isTouching(spaceShip)) {
            gameState = 1;
        }
    }

    if (gameState = 1) {
        asteroidGroup.destroyEach();
        bullet.visible = false;
    }

    drawSprites();
}

function asteroids() {
    if (frameCount % 70 === 0) {
        var asteroid = createSprite(windowWidth/2, 70, 20, 20);
        asteroid.addImage("asteroid", asteroidImg);
        asteroid.scale = 0.125;
        asteroid.x = spaceShip.x;
        asteroid.velocityY = 5;
        asteroid.lifetime = 90;
    }
    asteroidGroup.add(asteroid);
}