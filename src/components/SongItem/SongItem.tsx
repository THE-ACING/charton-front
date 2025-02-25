"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import LikeButton from "../LikeButton/LikeButton";
import {playlistsRemovePlaylist, playlistsRemoveTrackFromPlaylist, Track} from "@/client";
import { Divider } from "@telegram-apps/telegram-ui";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiShareFatFill } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";
import formatTime from "@/lib/formatTime";
import {useEffect} from "react";
import {openPopup} from "@telegram-apps/sdk-react";
import {useQueryClient} from "@tanstack/react-query";

interface SongItemProps {
  data: Track[] | any;
  onClick: (id: string) => void;
  isPlaylist: boolean;
  isOpen: boolean;
  clickHandler: () => void;
  playlistId: string;
}

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick,
  isPlaylist,
  isOpen,
  clickHandler,
  playlistId,
}) => {
  const queryClient = useQueryClient();

  const handleDeleteSong = async (id: any) => {
    await openPopup({
      title: `Delete song ${data.title}?`,
      message: "Are you sure?",
      buttons: [
        {
          id: "deleteSong",
          type: "destructive",
          text: "Delete",
        },
        {
          id: "cancelDeleteSong",
          type: "default",
          text: "Back",
        },
      ],
    }).then((buttonId) => {
      if (buttonId === "deleteSong") {
        playlistsRemoveTrackFromPlaylist({
          path: { track_id: id, playlist_id: playlistId },
        });
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
        queryClient.refetchQueries({ queryKey: ["playlists"] });
        isOpen = false;
      }
    });
  };

  return (
    <div
      className={`relative flex my-1 transition ${isOpen ? "translate-x-[113px]" : "translate-x-0"}`}
    >
      {isPlaylist && (
        <div
          className={
            "cursor-pointer flex bg-black absolute h-full w-[100px] left-[-113px] section-bg-color rounded-xl overflow-hidden"
          }
        >
          <div
            className={"bg-red-900 w-full p-3 flex items-center justify-center"}
            onClick={() => handleDeleteSong(data.id)}
          >
            <TiDelete size={20} />
          </div>
          <div
            className={
              "section-bg-color w-full p-3 flex items-center justify-center"
            }
          >
            <PiShareFatFill size={20} />
          </div>
        </div>
      )}

      {isPlaylist && (
        <div
          className={
            "section-bg-color rounded-l-xl p-2 flex items-center justify-center cursor-pointer experimental"
          }
          onClick={clickHandler}
        >
          <HiOutlineDotsVertical size={20} />
        </div>
      )}

      <Divider />

      <div
        className={`w-[100vw] py-4 pl-3 pr-4 flex items-center justify-between gap-x-3 ${isPlaylist ? "rounded-r-xl" : "rounded-xl"} cursor-pointer section-bg-color active:section-separator-color transition`}
      >
        <div
          onClick={() => onClick(data.id)}
          className={
            "flex flex-row items-center justify-between gap-x-4 h-full w-full"
          }
        >
          <div className={"flex items-center gap-x-3"}>
            {!isPlaylist && (
              <div>
                <FaPlay className={"ml-1"} />
              </div>
            )}

            <Image
              className={"w-[50px] h-[50px] rounded-2xl"}
              src={data.thumbnail}
              alt={"Image"}
              width={40}
              height={40}
            />

            <div className={"flex flex-row gap-x-2 items-center"}>
              <div className={"flex flex-col max-w-[30vw]"}>
                <h3 className={"text-color truncate text-[14px] font-medium"}>
                  {data.title}
                </h3>

                <p className={"text-[0.7rem] truncate subtitle-text-color"}>
                  {data.authors &&
                    data.authors.map((author: any) => author.name).join(", ")}
                </p>
              </div>
            </div>
          </div>

          <p className={"text-[0.8rem] leading-6 subtitle-text-color"}>
            {formatTime(data.duration)}
          </p>
        </div>

        {!isPlaylist ? (
          <div className={"flex flex-row gap-x-4"}>
            <LikeButton size={"small"} />
            {/*songId={song.id}*/}
          </div>
        ) : (
          <div>
            <FaPlay className={"ml-1"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SongItem;
