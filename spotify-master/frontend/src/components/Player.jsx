import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../context/Song";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay, FaComments } from "react-icons/fa"; // Import FaComments for the chat icon
import Chat from "../components/Chat"; // Import the Chat component
import { UserData } from "../context/User"; // Import UserData context

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextMusic,
    prevMusic,
  } = SongData();

  const { user } = UserData(); // Get the current user from the UserData context

  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [volume, setVolume] = useState(1);
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div>
      {song && (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
          {/* Song Details */}
          <div className="lg:flex items-center gap-4">
            <img
              src={
                song.thumbnail
                  ? song.thumbnail.url
                  : "https://via.placeholder.com/50"
              }
              className="w-12"
              alt=""
            />
            <div className="hidden md:block">
              <p>{song.title}</p>
              <p>{song.description && song.description.slice(0, 30)}...</p>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-col items-center gap-1 m-auto">
            {song && song.audio && (
              <>
                {isPlaying ? (
                  <audio ref={audioRef} src={song.audio.url} autoPlay />
                ) : (
                  <audio ref={audioRef} src={song.audio.url} />
                )}
              </>
            )}
            <div className="w-full flex items-center font-thin text-green-400">
              <input
                type="range"
                min={"0"}
                max={"100"}
                className="progress-bar w-[120px] md:w-[300px]"
                value={(progress / duration) * 100}
                onChange={handleProgressChange}
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <span className="cursor-pointer" onClick={prevMusic}>
                <GrChapterPrevious />
              </span>
              <button
                className="bg-white text-black rounded-full p-2"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <span className="cursor-pointer" onClick={nextMusic}>
                <GrChapterNext />
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center">
            <input
              type="range"
              className="w-16 md:w-32"
              min={"0"}
              max={"1"}
              step={"0.01"}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>

          {/* Chat Toggle Button */}
          <div className="ml-4">
            <button
              className="text-white hover:text-gray-400 transition-colors"
              onClick={() => setIsChatOpen(!isChatOpen)} // Toggle chat visibility
            >
              <FaComments size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Box */}
      {isChatOpen && (
        <div
          className="fixed bottom-4 right-4 w-96 bg-black text-white p-4 rounded-md shadow-lg border border-gray-700"
          style={{ zIndex: 1000 }}
        >
          {/* Chat Header with Minimize Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chat</h2>
            <button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsChatOpen(false)} // Hide the chat box
            >
              <FaComments size={16} />
            </button>
          </div>

          {/* Chat Content */}
          <Chat currentUser={user} />
        </div>
      )}
    </div>
  );
};

export default Player;