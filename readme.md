# Firefox-OS remote control

Use your Firefox-OS device to remotely control anything understanding WebSockets.

## Installation

```bash
$ npm install jake -g # optional
$ npm install
```

## Usage

### 1. Share your devices Internet connection

Enable Internet connection sharing in your FFOS device
and create a HotSpot.

Now connect to the HotSpot with your computer.

**If you are able to connect through LAN/WAN to your computer do that instead.**

### 2. Start the web-socket server

```bash
$ node ./server/index.js # will run server on port 9000
```

or using jake

```bash
$ jake server[port] # you can define any port here, by default it uses 9000
```

It will show the IP of your computer. Remeber this one.

### 3. Start the static file server

```bash
$ jake static-server[port] # you can define any port here, by default it uses 8000
```

or serve the files using your own web-server.

### 4. Connect to the FFOS-Remote client on your phone

Open the Browser in your phone with the following address:

```
http://[IP-of-your-computer]:8000/ffos
```

Now type in the following address into the input:

```
http://[IP-of-your-computer]:9000
```

### 5. Debug FFOS remote control

Open the browser debuging client in your computers browser:

```
http://localhost:8000/browser
```

Enter the following address into the input:

```
http://localhost:9000
```

All messages send from your phone will be listed.
