const API_URL = 'http://localhost:3010/api';

export const connectToTv = async (ip: string) => {
    const response = await fetch(`${API_URL}/connect`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const sendCommand = async (command: string, ip: string) => {
    try {
        const response = await fetch(`${API_URL}/command`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command, ip }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error sending command:', error);
        // Don't throw, just log, so UI doesn't crash if server is down
        return { error: 'Failed to connect to server' };
    }
};
