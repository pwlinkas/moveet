const { Notification } = require('electron')

let NotificationIntervalInMinutes = 0.2
let NotificationTimer

const ShowNotification = function() {
	console.log("Showing notification...")
	let options = {
		"title": "MoveeT",
		"body": "It's about time to MoveeT!"
	}
	let notification = new Notification(options).show()
}

const SetNotificationTimer = function(intervalInMinutes) {
	NotificationIntervalInMinutes = intervalInMinutes
	console.log("Timer set to " + NotificationIntervalInMinutes + " minutes.")
}

const StartNotificationTimer = function() {
	console.log("Starting timer with " + NotificationIntervalInMinutes + "m intervals.")
	clearInterval(NotificationTimer)
	NotificationTimer = setInterval(ShowNotification, NotificationIntervalInMinutes * 60 * 1000)
}



module.exports.Notifications = {
	ShowNotification,
	SetNotificationTimer,
	StartNotificationTimer
}