const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.4

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
        this.width = 200
        this.height = 500
    }

    draw() {
        ctx.fillStyle = 'rgba(0,0,255,0.5)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (this.position.y + this.velocity.y > canvas.height || this.position.y + this.velocity.y < 0) {
            this.velocity.y = -this.velocity.y;
        }
        if (this.position.x + this.velocity.x > (canvas.width-this.witdh) || this.position.x + this.velocity.x < 0) {
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
        if(this.position.x > canvas.width) {
            console.log(this.position.x)
            this.velocity.x = 0
        }
    }
}

const player = new Player();

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (Keys.right === true) {
        player.velocity.x = 5
    }
    if (Keys.left === true) {
        player.velocity.x = -5
    }
};

animate()

window.addEventListener('keydown', (event) => {
    const nomTouche = event.key;

    if (' ' === nomTouche) {
            Keys.up = true;
            player.velocity.y -= 10;
        }
    if ('ArrowDown' === nomTouche) {
        Keys.down = true;
    }
    if ('ArrowRight' === nomTouche) {
        Keys.right = true;
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
    }
    if ('ArrowDown' === nomTouche) {
        Keys.down = false;
    }
    if ('ArrowRight' === nomTouche) {
        Keys.right = false;
        player.velocity.x = 0;
    }
    if ('ArrowLeft' === nomTouche) {
        Keys.left = false;
        player.velocity.x = 0;
    }
});
  