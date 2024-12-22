"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { Page } from "@/components/Page";
import { Button, Modal } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {useEffect, useState} from "react";
import Input from "@/components/Input/Input";
import React from "react";
import { Icon28Close } from "@telegram-apps/telegram-ui/dist/icons/28/close";
import {playlistsCreatePlaylist, tracksSearchTracks, userGetPlaylists} from "@/client";
import useUserAuth from "@/hooks/useUserAuth";
import { useQuery } from "@tanstack/react-query";
import PlaylistCard from "@/components/PlaylistCard/PlaylistCard";

const Playlists = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistLink, setPlaylistLink] = useState("");

  const user = useUserAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`playlists`, user?.data?.id],
    queryFn: async () =>
      userGetPlaylists({ path: { user_id: user?.data?.id! } }),
    enabled: !!user?.data?.id,
  });

  useEffect(() => {
    refetch()
  }, [refetch]);

  const handleCreatePlaylist = async () => {
    await playlistsCreatePlaylist({ body: { title: playlistName } });
    await refetch();

    setPlaylistName("");
    setPlaylistLink("");
  };

  return (
    <Page back={true}>
      <div className={"px-3 py-5 box flex flex-col gap-y-0.5 text-color "}>
        <div className={"flex justify-center items-center flex-col gap-y-1"}>
          <div
            className={
              "p-1.5 border-2 border-[#ddd] bg-[#424242]/[.3] rounded-3xl"
            }
          >
            <Image
              className={"w-[100px] h-[100px] rounded-3xl"}
              src={"/images/favBg-4.jpg"}
              alt={"image"}
              width={50}
              height={50}
            />
          </div>

          <h2 className={"text-center text-[1.2rem] font-bold mb-4"}>
            Playlists
          </h2>
        </div>
        <div className={"flex flex-col gap-y-1 "}>
          <Modal
            className={`px-5 flex justify-center pb-6 z-[999]`}
            header={
              <ModalHeader
                after={
                  <Modal.Close>
                    <Icon28Close
                      style={{ color: "var(--tgui--plain_foreground)" }}
                    />
                  </Modal.Close>
                }
              ></ModalHeader>
            }
            snapPoints={[1]}
            preventScrollRestoration={false}
            modal={false}
            trigger={
              <Button
                before={<FaPlus />}
                mode="filled"
                size="l"
              >
                New Playlist
              </Button>
            }
          >
            <React.Fragment key=".0">
              <div className={"h-[80vh]"}>
                <h2 className={"text-[20px] font-semibold text-center pb-4"}>
                  Create Playlist
                </h2>
                <h2 className={"mb-1 font-medium text-[18px]"}>Title</h2>
                <Input
                  className={
                    "border-2 section-separator-color-border mb-1 truncate"
                  }
                  placeholder="Let's call it..."
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />

                <h2 className={"mt-5 font-medium text-[18px] leading-5"}>
                  Connect an existing playlist
                </h2>
                <p className={"text-[14px] subtitle-text-color mb-2"}>
                  (optional)
                </p>
                <Input
                  className={
                    "border-2 section-separator-color-border mb-2 truncate "
                  }
                  placeholder="Link to"
                  value={playlistLink}
                  onChange={(e) => setPlaylistLink(e.target.value)}
                />
                <Modal.Close>
                  <Button
                    onClick={handleCreatePlaylist}
                    mode="filled"
                    size="l"
                    stretched
                    disabled={playlistName.length <= 3 && true}
                  >
                    Create
                  </Button>
                </Modal.Close>
              </div>
              <div></div>
              <div></div>
            </React.Fragment>
          </Modal>

          {isLoading && <div>Loading...</div>}
          {data?.data &&
            data.data.playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
        </div>
        {/*<div className={'relative cursor-pointer p-6 rounded-[20px] button-color font-bold flex items-center justify-center gap-x-2'}>*/}
        {/*    <p>New Playlist</p>*/}
        {/*    <FaPlus size={20} className={'text-color'} />*/}
        {/*</div>*/}
      </div>
    </Page>
  );
};

export default Playlists;
