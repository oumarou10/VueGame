new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        gameStart: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        attack: function () {
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for '+ damage
            });
            if(this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal: function () {
            if(this.playerHealth <= 90) {
                this.playerHealth += 10
            } else  {
                this.playerHealth = 100
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals himself'
            });
            this.monsterAttacks();
        },
        specialAttack: function () {
            damage = this.calculateDamage(5,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster with a special attack for '+ damage
            });
            if(this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: 'Monster hits player for '+ damage
            });

            this.checkWin();
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.turns = []
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if(confirm('You won ! Want play again ?')){
                    this.gameStart();
                }else {
                    this.giveUp();
                }
                return true;
            }
            else if (this.playerHealth <= 0) {
                if(confirm('You Lose ! Want you play again ?')){
                    return this.gameStart();
                } else {
                   this.giveUp();
                }
                return false;
            }
        }
    }
})