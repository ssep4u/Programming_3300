import { useRef, useState } from "react";
import './Audio.css';   // ← .jsx → .css 로 수정

export default function AudioBox() {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleToggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="audio-box">
            <h3 className="audio-status">
                {isPlaying ? "now playing... " : "stopped..."}
            </h3>
            <audio ref={audioRef}>
                <source src="/audios/sea.mp3" type="audio/mpeg" />
            </audio>
            <button
                className="audio-button"
                onClick={handleToggleAudio}
            >
                {isPlaying ? "❚❚" : "▶"}
            </button>
        </div>
    );
}