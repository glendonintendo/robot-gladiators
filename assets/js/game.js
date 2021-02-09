var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    
    if (promptFight.toLowerCase() === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        if (confirmSkip) {
            window.alert(`${playerInfo.name} has decided to skip this fight. Goodbye!`);
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
};

var fight = function(enemy) {
    var isPlayerTurn = true;
    if (Math.random() > .5) {
        isPlayerTurn = false;
    }

    while (enemy.health > 0 && playerInfo.health > 0) {
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                break;
            }
        
            var playerDamage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - playerDamage);
            console.log(`${playerInfo.name} attacked ${enemy.name}. ${enemy.name} now has ${enemy.health} health.`);
            if (enemy.health <= 0) {
                window.alert(`${enemy.name} has died!`);
                playerInfo.money += 20;
                break;
            } else {
                window.alert(`${enemy.name} still has ${enemy.health} health left.`);
            }
        } else {
            var enemyDamage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - enemyDamage);
            console.log(`${enemy.name} attacked ${playerInfo.name}. ${playerInfo.name} now has ${playerInfo.health} health.`);
            
            if (playerInfo.health <= 0) {
                window.alert(`${playerInfo.name} has died!`);
                break;
            } else {
                window.alert(`${playerInfo.name} still has ${playerInfo.health} health left.`);
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
};

var startGame = function() {
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert(`Welcome to Robot Gladiators! Round ${i + 1}`);
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
        
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(40, 60);
        fight(pickedEnemyObj);
        
        if (playerInfo.health > 0 && i < enemyInfo.length -1 ) {
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            if (storeConfirm) {
                shop();
            }
        }
    }
    endGame();
};

var endGame = function() {
    if (playerInfo.health > 0) {
        window.alert(`Great job, you've survived the game! You earned a score of ${playerInfo.money}.`)
        var highScore = localStorage.getItem("highScore") || 0;

        if (playerInfo.money > highScore) {
            localStorage.setItem("highScore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);
            window.alert(`${playerInfo.name} now has the highScore of ${playerInfo.money}!`);
        } else {
            window.alert(`${playerInfo.name} did not surpass the high score of ${highScore}, previously set by ${localStorage.getItem("name")}. Better luck next time!`);
        }
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL you health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    switch(parseInt(shopOptionPrompt)) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var getPlayerName = function() {
    var name = ""
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log(`Your robot name is ${name}`);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attacl by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!")
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)   
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();