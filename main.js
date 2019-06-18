// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Notification, ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, notificationTimer, notificationIntervalInMinutes

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})

	// and load the index.html of the app.
	mainWindow.loadFile('index.html')

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})

	// Build menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
	Menu.setApplicationMenu(mainMenu)
	
	notificationIntervalInMinutes = 0.2 // Default
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow()
})

app.setAppUserModelId(process.execPath) // Enable notifications while developing

ipcMain.on('set-timer', function(event, data) {
	setNotificationTimer()
 });

function setNotificationTimer(){
	console.log("Setting timer to " + notificationIntervalInMinutes + " minutes.")
	clearInterval(notificationTimer)
	notificationTimer = setInterval(showNotification, notificationIntervalInMinutes * 60 * 1000)
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Create menu template
const mainMenuTemplate = [
	{
		label: 'Menu',
		submenu: [
			{
				label: 'Show notification',
				accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
				click() {
					showNotification()
				}
			}, {
				label: 'Exit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click() {
					app.quit()
				}
			}
		]
	}
]

function showNotification() {
	console.log("Showing notification...")
	let options = {
		"title": "MoveeT",
		"body": "It's about time to MoveeT!"
	}
	let notification = new Notification(options).show()
}