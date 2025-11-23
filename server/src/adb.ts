import { exec } from 'child_process';
import path from 'path';

// CONFIGURACIÓN DE RUTAS
// Usamos path.join para evitar problemas con las barras / o \ en Windows
const ADB_PATH = 'C:\\adb\\adb.exe';

export const KEY_CODES: Record<string, number> = {
    POWER: 26,
    UP: 19,
    DOWN: 20,
    LEFT: 21,
    RIGHT: 22,
    CENTER: 23, // OK
    HOME: 3,
    BACK: 4,
    VOL_UP: 24,
    VOL_DOWN: 25,
    MUTE: 164,
    MENU: 82,
    PLAY_PAUSE: 85,
    REWIND: 88,
    FAST_FORWARD: 87,
    NETFLIX: 191,
    YOUTUBE: 210,
};

// Función nueva para conectar al iniciar
export const connectToTv = (ip: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        console.log(`Intentando conectar a ADB en ${ip}...`);

        // Usamos "${ADB_PATH}" (con comillas por si la ruta tuviera espacios)
        const command = `"${ADB_PATH}" connect ${ip}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error conectando: ${error.message}`);
                reject(error);
                return;
            }
            console.log(`Resultado conexión: ${stdout}`);
            resolve(stdout);
        });
    });
};

export const executeKey = (key: string, ip: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const keyCode = KEY_CODES[key];
        if (!keyCode) {
            reject(new Error(`Invalid key: ${key}`));
            return;
        }

        // Llamamos al ejecutable con la ruta completa y apuntamos a la IP específica
        const command = `"${ADB_PATH}" -s ${ip} shell input keyevent ${keyCode}`;
        console.log(`Executing: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
};

export const executeCommand = (cmd: string, ip: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Ejecución genérica con ruta completa
        const command = `"${ADB_PATH}" -s ${ip} ${cmd}`;
        console.log(`Executing raw: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}