import React, { useState } from 'react';
import {
    Power,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Home,
    ArrowLeft,
    Volume2,
    Volume1,
    VolumeX,
    Menu,
    Play,
    FastForward,
    Rewind,
    Wifi
} from 'lucide-react';
import { motion } from 'framer-motion';
import { sendCommand, connectToTv } from '../api';

const RemoteButton = ({
    icon: Icon,
    label,
    command,
    className = "",
    variant = "default",
    size = "default",
    disabled = false,
    onPress
}: {
    icon?: React.ElementType,
    label?: string,
    command: string,
    className?: string,
    variant?: "default" | "primary" | "danger" | "ghost",
    size?: "default" | "lg" | "sm",
    disabled?: boolean,
    onPress: (cmd: string) => void
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        if (disabled) return;
        setIsPressed(true);
        // Haptic feedback if available
        if (navigator.vibrate) navigator.vibrate(50);
        onPress(command);
        setTimeout(() => setIsPressed(false), 150);
    };

    const variants = {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "bg-transparent text-foreground hover:bg-white/10"
    };

    const sizes = {
        default: "w-14 h-14",
        lg: "w-16 h-16",
        sm: "w-10 h-10"
    };

    return (
        <motion.button
            whileTap={!disabled ? { scale: 0.9 } : {}}
            onClick={handlePress}
            disabled={disabled}
            className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-2xl flex items-center justify-center
        transition-all duration-200
        shadow-lg border border-white/5
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
            aria-label={label || command}
        >
            {Icon && <Icon size={size === 'sm' ? 18 : 24} />}
            {label && <span className="font-semibold text-xs">{label}</span>}
        </motion.button>
    );
};

export const Remote = () => {
    const [ip, setIp] = useState('192.168.1.24');
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            await connectToTv(ip);
            setIsConnected(true);
        } catch (error) {
            console.error("Failed to connect", error);
            alert("Failed to connect to TV. Check IP and try again.");
        } finally {
            setIsConnecting(false);
        }
    };

    const handleCommand = async (command: string) => {
        if (!isConnected) return;
        try {
            await sendCommand(command, ip);
        } catch (error) {
            console.error("Failed to send command", error);
        }
    };

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background to-black">
                <div className="glass-panel rounded-3xl p-8 w-full max-w-xs flex flex-col gap-6 items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <Wifi size={40} className="text-primary" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Connect to TV</h2>
                        <p className="text-muted-foreground text-sm">Enter your TCL TV's IP address to start controlling it.</p>
                    </div>

                    <div className="w-full space-y-4">
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="192.168.1.x"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors text-center text-lg tracking-wider"
                        />

                        <button
                            onClick={handleConnect}
                            disabled={isConnecting}
                            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isConnecting ? (
                                <>
                                    <span className="animate-spin">⟳</span> Connecting...
                                </>
                            ) : (
                                'Connect'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background to-black">
            <div className="glass-panel rounded-[3rem] p-8 w-full max-w-xs flex flex-col gap-8 relative overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Header / Power */}
                <div className="flex justify-between items-center px-2">
                    <button
                        onClick={() => setIsConnected(false)}
                        className="text-xs font-medium text-muted-foreground hover:text-white transition-colors flex items-center gap-1"
                    >
                        <Wifi size={12} /> {ip}
                    </button>
                    <RemoteButton icon={Power} command="POWER" variant="danger" size="sm" onPress={handleCommand} />
                </div>

                {/* Navigation Circle */}
                <div className="relative w-64 h-64 mx-auto bg-secondary/30 rounded-full flex items-center justify-center border border-white/5 shadow-inner-glow">
                    <RemoteButton
                        icon={ChevronUp}
                        command="UP"
                        variant="ghost"
                        className="absolute top-2 left-1/2 -translate-x-1/2"
                        onPress={handleCommand}
                    />
                    <RemoteButton
                        icon={ChevronDown}
                        command="DOWN"
                        variant="ghost"
                        className="absolute bottom-2 left-1/2 -translate-x-1/2"
                        onPress={handleCommand}
                    />
                    <RemoteButton
                        icon={ChevronLeft}
                        command="LEFT"
                        variant="ghost"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onPress={handleCommand}
                    />
                    <RemoteButton
                        icon={ChevronRight}
                        command="RIGHT"
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onPress={handleCommand}
                    />

                    {/* OK Button */}
                    <RemoteButton
                        label="OK"
                        command="CENTER"
                        variant="primary"
                        size="lg"
                        className="rounded-full z-10"
                        onPress={handleCommand}
                    />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-4 px-2">
                    <RemoteButton icon={ArrowLeft} command="BACK" variant="default" onPress={handleCommand} />
                    <RemoteButton icon={Home} command="HOME" variant="default" onPress={handleCommand} />
                    <RemoteButton icon={Menu} command="MENU" variant="default" onPress={handleCommand} />
                </div>

                {/* Volume & Playback */}
                <div className="glass rounded-2xl p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <RemoteButton icon={VolumeX} command="MUTE" variant="ghost" size="sm" onPress={handleCommand} />
                        <div className="flex flex-col gap-2 items-center">
                            <RemoteButton icon={Volume2} command="VOL_UP" variant="default" className="h-12 w-20 rounded-xl" onPress={handleCommand} />
                            <RemoteButton icon={Volume1} command="VOL_DOWN" variant="default" className="h-12 w-20 rounded-xl" onPress={handleCommand} />
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <RemoteButton icon={Rewind} command="REWIND" variant="ghost" size="sm" onPress={handleCommand} />
                        <RemoteButton icon={Play} command="PLAY_PAUSE" variant="ghost" size="sm" onPress={handleCommand} />
                        <RemoteButton icon={FastForward} command="FAST_FORWARD" variant="ghost" size="sm" onPress={handleCommand} />
                    </div>
                </div>

            </div>
        </div>
    );
};
