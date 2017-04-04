// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.random()*100
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed *dt
    if (this.x > 505) {
        this.x = -101;
    }
};




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
//玩家到达河边就跳回初始位置。碰撞检测，发生碰撞就回到初始位置。
Player.prototype.update = function() {
    if (this.y === -11) {
        this.x = 202;
        this.y = 404;
    }
    for( var i = 0 ; i < allEnemies.length; i++) {
        if (Math.abs(this.y - allEnemies[i].y) < 30) {
            if (Math.abs(this.x - allEnemies[i].x) < 75) {
                this.x = 202;
                this.y = 404;
            }
        }
     };
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//人物移动控制，且不允许人物移动出边界
Player.prototype.handleInput = function(handle) {
    switch(handle) {
        case 'left' : if (this.x > -2) {
            this.x -= 101;
            console.log(this.x);
            
        } break;
        case 'right' : if (this.x < 402) {
            this.x += 101;
            console.log(this.x);
            
        } break;
        case 'up' : if (this.y > 0) {
            this.y -= 83;
            console.log(this.y);
            
        } break;
        case 'down' : if(this.y < 404) {
            this.y += 83;
            console.log(this.y);
            
        } break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0 ; i < 6; i++){
    var enemy = new Enemy(-101,83*(i%3)+60);
    allEnemies.push(enemy);  
};

var player = new Player(202,404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
