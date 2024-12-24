"use client";

import usePlayer from "@/hooks/usePlayerStore";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Track } from "@/client";
import Audio from "./Audio";
import ExpandedPlayer from "@/components/Player/ExpandedPlayer";
import CompactPlayer from "@/components/Player/CompactPlayer";

interface PlayerContentProps {
  song: Track;
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  expand,
  setExpand,
}) => {
  const lp = useLaunchParams();
  const player = usePlayer();

  // const {isPlaying, setIsPlaying} = usePlayerStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const [volume, setVolume] = useState(10);
  const [shuffled, setShuffled] = useState(false);
  const [looped, setLooped] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

  const [audioProgress, setAudioProgress] = useState(0);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    if (!prevValue) {
      if (audioRef?.current) {
        audioRef?.current!.play();
      }
    } else {
      if (audioRef?.current) {
        audioRef?.current!.pause();
      }
    }
    setIsPlaying(!prevValue);
  };

  const handleTimeUpdate = () => {
    if (audioRef?.current) {
      setCurrentTime(audioRef.current!.currentTime);
      const progress = parseInt(
        String(
          (audioRef.current!.currentTime / audioRef.current!.duration) * 100,
        ),
      );
      setAudioProgress(isNaN(progress) ? 0 : progress);
      progressRef.current?.style.setProperty(
        "--seek-before-width-compact",
        `${(audioRef.current!.currentTime / audioRef.current!.duration) * 100}%`,
      );
    }
  };

  useEffect(() => {
    handleTimeUpdate();
    const seconds = Math.floor(audioRef.current!.duration);

    setDuration(seconds);
  }, [audioRef?.current?.onloadedmetadata, audioRef?.current?.readyState]);

  useEffect(() => {
    if (audioRef) {
      if ("volume" in audioRef.current!) {
        if ("volume" in audioRef.current) {
          audioRef.current.volume = volume / 100;
        }
      }
    }
  }, [volume, audioRef]);

  const changeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioProgress(Number(e.target.value));
    if (audioRef?.current) {
      audioRef.current!.currentTime =
        (Number(e.target.value) * audioRef.current!.duration) / 100;
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef?.current) {
      setDuration(audioRef.current!.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(10);
    } else {
      setVolume(0);
    }
  };
  const handleShuffle = () => {
    if (!shuffled) {
      player.shuffle();
      console.log(player.ids);
    }
    setShuffled(!shuffled);
    setLooped(false);
  };

  console.log("rerender")

  return (
    <>
      <div
        className={`shadow-xl z-[11] absolute flex justify-between  overflow-hidden ${expand ? `m-0 top-0 w-full h-full transition-all z-99999` : `${lp?.platform === "ios" ? "bottom-[103px]" : "bottom-[91px]"} right-2 left-2`}`}
      >
        <div className={`overflow-hidden w-full`}>
          <div
            className={`border-b border-x relative w-full  section-separator-color-border shadow overflow-hidden transition-all ${expand ? `h-full rounded-none  secondary-bg-color p-3 pb-0 border-none ${lp?.platform === "ios" ? "pb-5" : "pb-2"}` : "section-bg-color rounded-3xl p-1"}`}
          >
            {expand ? (
              <ExpandedPlayer
                expand={expand}
                setExpand={setExpand}
                song={song}
                formatTime={formatTime}
                currentTime={currentTime}
                duration={duration}
                audioProgress={audioProgress}
                progressRefValue={progressRef}
                changeProgress={changeProgress}
                volume={volume}
                setVolume={setVolume}
                setLooped={setLooped}
                setShuffled={setShuffled}
                looped={looped}
                onPlayPrevious={onPlayPrevious}
                onPlayNext={onPlayNext}
                togglePlayPause={togglePlayPause}
                handleShuffle={handleShuffle}
                toggleMute={toggleMute}
                isPlaying={isPlaying}
                shuffled={shuffled}
              />
            ) : (
              <CompactPlayer
                isPlaying={isPlaying}
                setExpand={setExpand}
                song={song}
                togglePlayPause={togglePlayPause}
                onPlayNext={onPlayNext}
                progressRef={progressRef}
              />
            )}

            <Audio
              autoplay={true}
              refValue={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              source={song.source}
              onEnded={onPlayNext}
              looped={looped}
              preload={"none"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerContent;
