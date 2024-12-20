"use client";

import { Page } from "@/components/Page";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import {playlistsGetPlaylist, playlistsRemovePlaylist} from "@/client";
import { useQuery } from "@tanstack/react-query";
import PlaylistContent from "@/components/PlaylistContent/PlaylistContent";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Playlist = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`playlists`, id],
    queryFn: async () => playlistsGetPlaylist({ path: { playlist_id: id } }),
    enabled: !!id,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handlePlaylistDelete = async (id: any) => {
    await playlistsRemovePlaylist({path: {playlist_id: id}});
    await router.push("/playlists");
  };

  return (
    <Page back={true}>
      <div className={"px-3 py-5 box flex flex-col gap-y-8 text-color"}>
        <div className={"flex justify-center items-center flex-col gap-y-2"}>
          <div
            className={
              "p-1.5 border-2 border-[#ddd] bg-[#424242]/[.3] rounded-3xl"
            }
          >
            <Image
              className={"w-[200px] h-[200px] rounded-3xl"}
              src={"/images/favBg-4.jpg"}
              alt={"image"}
              width={50}
              height={50}
            />
          </div>

          <h2 className={"text-center text-[1.2rem] font-bold outline-none"}>
            {data?.data && data.data?.title}
          </h2>

          <div className={"flex flex-col items-center mb-4"}>
            <div className={"flex gap-x-2 items-center"}>
              <div className={"w-8 h-8 rounded-full bg-neutral-900"}></div>
              <p className={"text-[14px]"}>
                Mixed by <span className={"font-semibold"}>Чекан</span>
              </p>
            </div>
            <p className={"text-[13px]"}>
              {data?.data && data.data?.tracks.length > 0
                ? data.data?.tracks.length === 1
                  ? `${data?.data.tracks?.length} track`
                  : `${data?.data.tracks?.length} tracks`
                : "No tracks("}
            </p>
          </div>

          <div className={"flex items-center gap-x-5"}>
            <button
              onClick={() => handlePlaylistDelete(id)}
              className={
                "w-[50px] h-[50px] section-bg-color rounded-full flex items-center justify-center"
              }
            >
              <MdDelete size={20} />
            </button>
            <button
              className={
                "p-10 button-color rounded-full outline outline-2 outline-offset-4 outline-color"
              }
            >
              <FaPlay size={30} className={""} />
            </button>
            <button
              className={
                "w-[50px] h-[50px] section-bg-color rounded-full flex items-center justify-center"
              }
            >
              <IoIosShareAlt size={20} />
            </button>
          </div>
        </div>

        {data?.data?.tracks && <PlaylistContent songs={data?.data?.tracks} />}
      </div>
    </Page>
  );
};

export default Playlist;
