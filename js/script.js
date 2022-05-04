const imgIdle = 'style/img/player1/Martial Hero/Sprites/Idle.png'
const imgJump = 'style/img/player1/Martial Hero/Sprites/Jump.png'
const imgFall = 'style/img/player1/Martial Hero/Sprites/Fall.png'
const imgRun = 'style/img/player1/Martial Hero/Sprites/Run.png'



const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 5

var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
}

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 5
        }
        ctx.fillStyle = "#FF0000";
        this.width = 200
        this.height = 400
        this.frames = 0
        this.sprites = {
            stand: {
                jump: createImage(imgJump),
                fall: createImage(imgFall),
                cropWidth: 200,
            },
            run: {
                right: createImage(imgRun),
                cropWidth: 200,
            },
            idle: {
                idle: createImage(imgIdle),
                cropWidth: 200
            }
        }
        this.currentSprite = this.sprites.idle.idle
        this.currentCropWidth = 200
    }

    draw() {
        this.frames++
        if(this.frames > 1.9) this.frames = 0
        ctx.drawImage(this.currentSprite,this.currentCropWidth * this.frames,0,this.currentCropWidth,500,this.position.x,this.position.y, this.width, this.height)
        if (this.position.y + this.velocity.y > canvas.height || this.position.y + this.velocity.y < 0) {
            this.velocity.y = -this.velocity.y;
        }
        if (this.position.x + this.velocity.x > 1820 || this.position.x + this.velocity.x < -100) {
            this.velocity.x = -this.velocity.x;
        }
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
        if(this.position.x > (canvas.width - this.width)) {
            this.velocity.x = 0
        }
    }
}



const player = new Player();

function animate(){
    requestAnimationFrame(animate)
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        player.update()
        if (Keys.right === true) {
            player.velocity.x = 20
        }
        if (Keys.left === true) {
            player.velocity.x = -20
        }
    }

};

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

startAnimating(120)

function createImage(imageSrc){
    const image = new Image()
    image.src = imageSrc
    return image
}

window.addEventListener('keydown', (event) => {
    const nomTouche = event.key;

    if (' ' === nomTouche) {
            player.velocity.y -= 30;
            player.currentSprite = player.sprites.stand.jump
            player.currentCropWidth = player.sprites.stand.cropWidth
        }
    if ('ArrowDown' === nomTouche) {
        Keys.down = true;
    }
    if ('ArrowRight' === nomTouche) {
        Keys.right = true;
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.velocity.x += 1;
    }
    if ('ArrowLeft' === nomTouche) {
        Keys.left = true;
        player.velocity.x -= 1;
    }
});
  
window.addEventListener('keyup', (event) => {
    const nomTouche = event.key;

    if (' ' === nomTouche) {
        Keys.up = false;
        player.currentSprite = player.sprites.stand.fall
        player.currentCropWidth = player.sprite.stand.cropWidth
    }
    if ('ArrowDown' === nomTouche) {
        Keys.down = false;
    }
    if ('ArrowRight' === nomTouche) {
        Keys.right = false;
        player.currentSprite = player.sprites.idle.idle
        player.currentCropWidth = player.sprites.idle.cropWidth
        player.velocity.x = 0;
    }
    if ('ArrowLeft' === nomTouche) {
        Keys.left = false;
        player.velocity.x = 0;
    }
});
  