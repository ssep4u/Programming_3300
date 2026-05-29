import { useRef, useState } from "react";
import './Audiobox.css';

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
                {isPlaying ? "🎵재생중🎵" : "☠️정지☠️"}
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