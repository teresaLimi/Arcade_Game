//@description 敌人类
var Enemy = function() {
    this.x = -101;
    this.y = Math.floor(Math.random() * 3 + 1) * 75; //Math.floor(Math.random()*(max-min+1)+min);
    this.speed = (Math.random() * 5 - 1) * 100;
    this.sprite = 'images/enemy-bug.png';
};

// @description 更新敌人的位置，每一次的移动都乘以dt来保证游戏在所有的电脑上速度相同
// @param {dt} 时间间隙
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    this.checkCollisions();
};

// @description 在屏幕上画出敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// @description 检查是否碰撞
Enemy.prototype.checkCollisions = function() {
    if(Math.round(this.x/101) == Math.round(player.x/101) &&
    Math.round( this.y/83) == Math.round(player.y/83)){
        Engine(false);
    }
};

// @description 玩家类
var Player = function(){
    this.x = 2 * 101;
    this.y = 5 * 83;
    this.sprite = 'images/char-cat-girl.png';
};
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

// @description 键盘事件
// @param {key} 键码值
Player.prototype.handleInput = function(key){
    switch(key){
        case 'left':
            if(this.x/101 > 0){
                this.x -= 101;
            }
            break;
        case 'up':
            if(this.y/83 > 0){
                this.y -= 83;
                if(this.y/83 == 0){
                    Engine(true);
                }
            }
            break;
        case 'right':
            if(this.x/101 <4){
                this.x += 101;
            }
            break;
        case 'down':
            if(this.y/83 < 5){
                this.y += 83;
            }
            break;
    }
};
// @description 更新player位置
Player.prototype.update = function() {
    //alert("Your are win! Your scores is " + allEnemies.length);
    //Engine();
};

// @description 实例化所有对象
// @description 把玩家对象放进一个叫 player 的变量里面
let player = new Player();
// @description 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
let allEnemies = [];
function createEnemies(){
    setTimeout(function(){
        let enemy = new Enemy();
        allEnemies.push(enemy);
        createEnemies();
    },500)
}
createEnemies();

// @description 监听游戏玩家的键盘点击事件,并将键码值送到 Player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
