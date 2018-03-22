new Vue({
	el: "#app",
	data: {
		isRunning: false,
		playerHealth: 100,
		monsterHealth: 100,
		counter: 0
	},
	methods: {
		monsterTimedAttack: function() {
			if(this.playerHealth > 35){
			var redHealth = document.getElementById("player-health")
			redHealth.classList.toggle("red")
			}
		},
		minusHealth: function() {
			if(this.isRunning == false) {
				return
			}
			this.playerHealth -= 1
			if(this.playerHealth < 35){
				document.getElementById("player-health").className = "low-health"
			}
			if(this.monsterHealth < 50){
				document.getElementById("monster-health").className = "low-health"
			}
			this.checkWin()
		},
		timedHealth: function() {
			setInterval(this.minusHealth, 2000)
			setInterval(this.monsterTimedAttack, 600)
			this.checkWin()
		},
		start: function() {
			document.getElementById("startSound").play()
			this.counter = 0
			this.isRunning = true
			this.timedHealth()
		},
		giveUp: function() {
			document.getElementById("giveUpSound").play()
			setTimeout(function() {
				location.reload()
			}, 1100)
			// this.isRunning = false
			// this.playerHealth = 100
			// this.monsterHealth = 100

		},
		attack: function() {
			document.getElementById("attackSound").play()
			this.playerHealth -= Math.floor(Math.random() * 14) + 6
			this.monsterHealth -= Math.floor(Math.random() * 10) + 3
			this.checkWin()
			this.counter += 1
		},
		special:function() {
			document.getElementById("specialSound").play()
			this.playerHealth -= Math.floor(Math.random() * 18) + 6
			this.monsterHealth -= Math.floor(Math.random() * 13) + 5
			this.counter += 1
			this.checkWin()
		},
		heal: function() {
			if(this.counter >= 0) {
				document.getElementById("healSound").play()
			}
			if(this.counter < 0) {
				return
			}
			this.playerHealth += Math.floor(Math.random() * 16) + 10
			this.playerHealth -= Math.floor(Math.random() * 15) + 6
			this.counter -= 1
			this.checkWin()
			if(this.playerHealth > 60) {
				this.playerHealth -= 5 
			}
			if(this.playerHealth > 100) {
				this.playerHealth = 100
			}
		},
		checkWin: function() {
			if (this.monsterHealth <= 0) {
				var outcome = 'Win'
				this.newGame(outcome)
				return
			}
			if(this.playerHealth <= 0) {
				var outcome = 'lost'
				this.newGame(outcome)
			}
			console.log(this.counter)
		},
		newGame: function(outcome) {
				if(confirm("You " + outcome + "! New game?")) {
					if(outcome == 'Win'){
					document.getElementById("healSound").play()
						setTimeout(function() {
							location.reload()
						}, 1300)
					}
					if(outcome == 'lost'){
					document.getElementById("giveUpSound").play()
						setTimeout(function() {
							location.reload()
						}, 1200)
					}
					// this.playerHealth = 100
					// this.monsterHealth = 100
					// this.counter = 0
				}
			}
	}
})