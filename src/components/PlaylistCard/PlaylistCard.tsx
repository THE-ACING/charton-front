import React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import Link from "next/link";
import { Playlist } from "@/client";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link
      href={`playlists/${playlist.id}`}
      className={
        "w-full p-3 pr-6 section-bg-color transition rounded-[20px] flex justify-between items-center"
      }
    >
      <div className={"flex gap-x-4"}>
        <Image
          src={"/images/favBg-4.jpg"}
          alt={"image"}
          width={30}
          height={30}
          className={"w-[60px] h-[60px] rounded-2xl"}
        />
        <div className={"flex flex-col justify-center"}>
          <p className={"font-semibold leading-4 text-color"}>
            {playlist.title}
          </p>
          <p className={"text-[12px] subtitle-text-color"}>No tracks(</p>
        </div>
      </div>
      <FaPlay size={20} className={"text-color"} />
    </Link>
  );
};

export default PlaylistCard;
