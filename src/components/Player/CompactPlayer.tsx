import ProgressCompact from "@/components/Player/ProgressCompact";
import Image from "next/image";
import { IoPlaySkipForward } from "react-icons/io5";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Track } from "@/client";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

interface CompactPlayerProps {
  isPlaying: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  song: Track;
  togglePlayPause: () => void;
  onPlayNext: () => void;
  progressRef: MutableRefObject<HTMLInputElement | null>;
}

const CompactPlayer: React.FC<CompactPlayerProps> = ({
  isPlaying,
  setExpand,
  song,
  togglePlayPause,
  onPlayNext,
  progressRef,
}) => {
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  return (
    <div>
      <ProgressCompact refValue={progressRef} />
      {/*<ProgressCompact />*/}

      <div className={"flex items-center justify-between gap-x-2"}>
        <div
          onClick={() => setExpand(true)}
          className={"flex gap-x-2 items-center cursor-pointer p-1 w-full"}
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
            <p className={"subtitle-text-color truncate text-[12px] block"}>
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
  );
};

export default CompactPlayer;
