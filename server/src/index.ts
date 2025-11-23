// api.ts
import express from 'express';
import cors from 'cors';
import { executeKey, KEY_CODES, connectToTv } from './adb'; // Importamos connectToTv

const app = express();
const PORT = 3010;

app.use(cors());
app.use(express.json());

// Endpoint para ver qué teclas existen
app.get('/api/keys', (req, res) => {
    res.json(Object.keys(KEY_CODES));
});

// Endpoint para conectar
app.post('/api/connect', async (req, res) => {
    const { ip } = req.body;
    if (!ip) {
        return res.status(400).json({ error: 'IP address is required' });
    }
    try {
        const result = await connectToTv(ip);
        res.json({ success: true, result });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para ejecutar comando
app.post('/api/command', async (req, res) => {
    const { command, ip } = req.body;

    if (!command) {
        return res.status(400).json({ error: 'Command is required (e.g., "HOME", "VOL_UP")' });
    }
    if (!ip) {
        return res.status(400).json({ error: 'IP address is required' });
    }

    try {
        await executeKey(command, ip);
        res.json({ success: true, command });
    } catch (error: any) {
        // Si falla, podría ser que se perdió la conexión, intentamos reconectar una vez?
        // Por ahora devolvemos error 500
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});