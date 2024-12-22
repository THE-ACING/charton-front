"use client";

import Image from "next/image";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { IoPlaySkipForward } from "react-icons/io5";
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
import ProgressCompact from "./ProgressCompact";
import Audio from "./Audio";
import ExpandedPlayer from "@/components/Player/ExpandedPlayer";

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

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

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

  /////////////////////////////////

  // useEffect(() => {
  //   if (expand) {
  //     return backButton.onClick(() => {
  //       setExpand((prevState) => !prevState);
  //     });
  //   }
  // }, [expand, setExpand]);

  //////////////////////////////////

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

  return (
    <>
      <div
        className={`z-[11] absolute flex justify-between  overflow-hidden ${expand ? `m-0 top-0 w-full h-full transition-all z-99999` : `${lp?.platform === "ios" ? "bottom-[103px]" : "bottom-[91px]"} right-2 left-2`}`}
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
              <>
                <div>
                  {/*<ProgressCompact refValue={progressRef} />*/}
                  <ProgressCompact />

                  <div className={"flex items-center justify-between gap-x-2"}>
                    <div
                      onClick={() => setExpand(true)}
                      className={"flex gap-x-2 items-center cursor-pointer p-1"}
                    >
                      <div className={"w-[60px] h-[60px] bg-black rounded-3xl"}>
                        <Image
                          src={song.thumbnail}
                          alt={"image"}
                          width={150}
                          height={150}
                          className={"w-full h-full rounded-3xl"}
                        />
                      </div>

                      <div className={"max-w-[35vw]"}>
                        <p
                          className={
                            "max-w-[35vw] text-[15px] truncate text-color font-semibold"
                          }
                        >
                          {song.title}
                        </p>
                        <p
                          className={
                            "subtitle-text-color truncate text-[12px] block"
                          }
                        >
                          {song.authors.map((author) => author.name).join(", ")}
                        </p>
                      </div>
                    </div>

                    <div
                      className={
                        "flex flex-row items-center gap-x-1 section-separator-color-border rounded-full p-1"
                      }
                    >
                      <div
                        onClick={togglePlayPause}
                        className={`cursor-pointer flex items-center justify-center shadow-xl transition rounded-3xl p-4 border ${!isPlaying ? "button-border button-color" : "bg-transparent section-separator-color-border"}`}
                      >
                        <Icon size={24} className={"text-color"} />
                      </div>
                      <div
                        onClick={onPlayNext}
                        className={`shadow-xl flex items-center justify-center transition rounded-3xl cursor-pointer p-5 border section-separator-color-border`}
                      >
                        <IoPlaySkipForward size={16} className={"text-color"} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
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
