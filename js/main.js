new Vue({
	el: "#app",
	data: {
		isRunning: false,
		playerHealth: 100,
		monsterHealth: 100,
		counter: 0
	},
	methods: {
		minusHealth: function() {
			if(this.isRunning == false) {
				return
			}
			this.playerHealth -= 1
			if(this.playerHealth > 35){
			var redHealth = document.getElementById("player-health")
			redHealth.classList.toggle("red")
			}
			if(this.playerHealth < 35){
				document.getElementById("player-health").className = "low-health"
			}
			this.checkWin()
		},
		timedHealth: function() {
			setInterval(this.minusHealth, 1500)
			this.checkWin()
		},
		start: function() {
			this.counter = 0
			this.isRunning = true
			this.timedHealth()
		},
		giveUp: function() {
			location.reload()
			// this.isRunning = false
			// this.playerHealth = 100
			// this.monsterHealth = 100

		},
		attack: function() {
			this.playerHealth -= Math.floor(Math.random() * 14) + 6
			this.monsterHealth -= Math.floor(Math.random() * 10) + 3
			this.checkWin()
			this.counter += 1
		},
		special:function() {
			this.playerHealth -= Math.floor(Math.random() * 18) + 6
			this.monsterHealth -= Math.floor(Math.random() * 13) + 5
			this.counter += 1
			this.checkWin()
		},
		heal: function() {
			if(this.counter < 1) {
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
					location.reload()
					// this.playerHealth = 100
					// this.monsterHealth = 100
					// this.counter = 0
				} else {
					location.reload()
					// this.counter = 0
					// this.start()
				}
			}
	}
})