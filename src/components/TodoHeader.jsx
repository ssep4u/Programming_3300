import { useState, useRef } from "react";

const SONGS = [
  { src: "/ddokddokddok.mp3", label: "똑똑똑" },
  { src: "/itsme.mp3", label: "Its Me" },
  { src: "/redred.mp3", label: "Red Red" },
];

export default function TodoHeader() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeSong = (index) => {
    audioRef.current.src = SONGS[index].src;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.addEventListener('canplay', () => {
        audioRef.current.play().catch(() => {});
      }, { once: true });
    }
  };

  const nextSong = () => {
    const next = (songIndex + 1) % SONGS.length;
    setSongIndex(next);
    changeSong(next);
  };

  const prevSong = () => {
    const prev = (songIndex - 1 + SONGS.length) % SONGS.length;
    setSongIndex(prev);
    changeSong(prev);
  };

  const handleEnded = () => {
    nextSong();
  };

  return (
    <div className="todo__header">
      <h1 className="todo__title">No Think, Do It.</h1>
      <audio ref={audioRef} src={SONGS[songIndex].src} onEnded={handleEnded} />
      <div className="todo__music">
        <button className="todo__button--music" onClick={prevSong}>
          ⏮
        </button>
        <button className="todo__button--music" onClick={toggleMusic}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="todo__button--music" onClick={nextSong}>
          ⏭
        </button>
        <span className="todo__song-label">{SONGS[songIndex].label}</span>
      </div>
    </div>
  );
}
