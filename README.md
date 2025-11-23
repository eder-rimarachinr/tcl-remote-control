# Google TV Remote Control

A full-stack web application that allows you to control your TCL Google TV (and potentially other Android TV devices) from your browser using ADB (Android Debug Bridge).

## 🚀 Features

-   **Full Remote Control**: Power, Volume, Navigation (D-Pad), Home, Back, Menu, and Playback controls.
-   **Dynamic Connection**: Connect to any Android TV by entering its IP address directly from the UI.
-   **Modern UI**: sleek, glassmorphism-inspired interface built with Tailwind CSS.
-   **Haptic Feedback**: Vibration feedback on button presses (on supported devices).
-   **Responsive Design**: Works great on mobile and desktop browsers.

## 🛠️ Tech Stack

-   **Frontend**:
    -   React (Vite)
    -   TypeScript
    -   Tailwind CSS (v4)
    -   Framer Motion (Animations)
    -   Lucide React (Icons)
-   **Backend**:
    -   Node.js
    -   Express
    -   TypeScript
    -   ADB (Android Debug Bridge)

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

-   **Node.js**: Installed on your machine.
-   **ADB**: Android Debug Bridge installed and added to your system PATH (or configured in the server code).
    -   *Note*: The server currently expects ADB at `C:\adb\adb.exe` on Windows. You may need to adjust this path in `server/src/adb.ts` if your installation differs.
-   **Android TV**:
    -   Developer Options enabled.
    -   USB Debugging enabled.
    -   Connected to the same Wi-Fi network as the server.

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd control
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Start the backend server:

```bash
npm run dev
```
The server will start on `http://localhost:3010`.

### 3. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```
The client will start on `http://localhost:5173` (or similar).

## 📱 Usage

1.  Open the application in your web browser (e.g., `http://localhost:5173`).
2.  You will see a connection screen.
3.  Enter the **IP Address** of your TV (e.g., `192.168.1.24`).
    -   *Tip*: You can find the IP address in your TV settings under *Network & Internet*.
4.  Click the **Connect** button.
5.  If it's your first time connecting, check your TV screen to **allow the ADB debugging connection**.
6.  Once connected, the remote interface will appear. You can now control your TV!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
