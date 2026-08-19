# WIFI SWITCH - HOME AUTOMATION - SERVER

## Overview
ESP32BackEnd is a simple real-time control panel application designed to interface with ESP32 microcontrollers via WebSockets. It allows users to control appliance relays connected to the ESP32 through a web-based user interface. The project consists of a Node.js backend server that serves the frontend and handles WebSocket communication, enabling bi-directional messaging between the ESP32 device and browser clients.

## What It Does
- Hosts an HTTP server serving a web-based appliance control panel.
- Establishes a WebSocket server for real-time communication with ESP32 and browser clients.
- Allows turning digital pins (relays) on or off via the web app.
- Broadcasts command and status messages between all connected clients and the ESP32 device.
- Displays connection status and reflect current relay state in the web UI.

## Contents
- `server.js` - Node.js Express server combined with WebSocket server handling.
- `package.json` - Project metadata and dependencies.
- `public/index.html` - Frontend web application with controls for relay pins.
- Static assets served from the project root or `public` folder.

## Tech Stack
- [Node.js](https://nodejs.org/) - JavaScript runtime for backend.
- [Express](https://expressjs.com/) - Web application framework for Node.js.
- [ws](https://github.com/websockets/ws) - WebSocket library for real-time bidirectional communication.
- Vanilla JavaScript, HTML, and CSS in frontend.

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- ESP32 device flashed with compatible firmware to connect via WebSocket.
- Network connectivity between ESP32 and your machine.

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ESP32BackEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The server will listen on port 3000 and serve the app at `http://localhost:3000`.

4. Open a browser and navigate to:
   ```
   http://localhost:3000
   ```
   or replace `localhost` with your server's IP address if accessing over LAN.

5. Connect your ESP32 device, which should establish a WebSocket connection to this server for command communication.

# WIFI SWITCH - HOME AUTOMATION - CLIENT
[Client - esp32 module repo](https://github.com/roy-rahul/wifi-switch-home-automation)

## Usage
- Use the web UI to input the relay pin number.
- Click "TURN ON" or "TURN OFF" to control the relay connected to the ESP32.
- The UI will show connection status and reflect the relay's current state.
- Communication between browser and ESP32 flows through the WebSocket server, enabling instantaneous control and feedback.

## WebSocket Protocol
- Messages are sent as JSON strings with `type`, `body`, and metadata fields.
- Browser controls send commands with `type: "cmd"` and `body` specifying pin and value.
- ESP32 device sends messages indicating relay state and errors if any.
- Server broadcasts messages to all connected clients to synchronize state.

## License
This project is licensed under the ISC License.

---

Feel free to customize this README further as per your specific firmware or additional features.
