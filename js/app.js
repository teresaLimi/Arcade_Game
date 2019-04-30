//@description 敌人类
var Enemy = function() {
    this.x = -101;
    this.y = Math.floor(Math.random() * 3 + 1) * 75; //Math.floor(Math.random()*(max-min+1)+min);
    this.speed = Math.random() * 100 + 100;
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
        Engine.checkCollisions(false);
    }
};

// @description 玩家类
// @param {img} 玩家类型
var Player = function(img){
    this.x = 2 * 101;
    this.y = 5 * 83;
    this.sprite = img;
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
                    Engine.checkCollisions(true);
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
let player;
// @description 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
let allEnemies = [];
var createEnemies = function (){
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
        40: 'down',
        13: 'enter'
    };
    // @description 监听选择角色时key值
    if(document.getElementsByClassName("dialog")[0].style.display == "none"){
        player.handleInput(allowedKeys[e.keyCode]);
    }else{
        choseRole(allowedKeys[e.keyCode]);
    }
});

// @description 键盘选择角色
// @param {key} 键码值
function choseRole(key){
    var currentActive = document.getElementsByClassName('active')[0];
    var liList = document.getElementsByTagName('li');
    var index;
    for(var i = 0; i < liList.length; i++){
        if(liList[i].getAttribute('class')){
            index = i;
        }
    }
    switch(key){
        case 'left':
            if(index > 0){
                currentActive.removeAttribute('class');
                liList[index - 1].setAttribute('class','active');
            }
            break;
        case 'right':
            if(index < liList.length - 1){
                currentActive.removeAttribute('class');
                liList[index + 1].setAttribute('class','active');
            }
            break;
        case 'enter':
            gameState();
            break;
    }
}

// @description 鼠标选择角色
// @param {e} 当前点击li的this
function clickChoseRole(e){
    document.getElementsByClassName('active')[0].removeAttribute('class');
    e.setAttribute('class','active');
}
// @description 点击开始按钮，游戏开始
function gameState(){
    document.getElementsByClassName("dialog")[0].style.display = "none";
    player = new Player(document.getElementsByClassName('active')[0].children[0].getAttribute('src'));
    Engine.init();
}
