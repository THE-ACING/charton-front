import React, {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { IoClose, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { TbRepeat } from "react-icons/tb";
import { PiShuffleBold } from "react-icons/pi";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { playlistsAddTrackToPlaylist, Track, userGetPlaylists } from "@/client";
import { Divider } from "@telegram-apps/telegram-ui";
import { CgClose } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import useUserAuth from "@/hooks/useUserAuth";

interface ExpandedPlayerProps {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  song: Track;
  formatTime: (number: number) => ReactNode;
  currentTime: number;
  duration: number;
  audioProgress: number;
  progressRefValue: MutableRefObject<HTMLInputElement | null>;
  changeProgress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  setVolume: (prevState: number) => void;
  setLooped: (prevState: boolean) => void;
  setShuffled: (prevState: boolean) => void;
  looped: boolean;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
  togglePlayPause: () => void;
  handleShuffle: () => void;
  toggleMute: () => void;
  isPlaying: boolean;
  shuffled: boolean;
}

const ExpandedPlayer: React.FC<ExpandedPlayerProps> = ({
  expand,
  setExpand,
  song,
  formatTime,
  currentTime,
  duration,
  audioProgress,
  progressRefValue,
  changeProgress,
  volume,
  setVolume,
  setLooped,
  setShuffled,
  looped,
  onPlayPrevious,
  onPlayNext,
  togglePlayPause,
  handleShuffle,
  toggleMute,
  isPlaying,
  shuffled,
}) => {
  const user = useUserAuth();
  const [openTooltip, setOpenTooltip] = useState(false);

  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const PlaylistIcon = openTooltip ? CgClose : FaPlus;

  const { data, isLoading } = useQuery({
    queryKey: [`playlists`, user?.data?.id],
    queryFn: async () =>
      userGetPlaylists({ path: { user_id: user?.data?.id! } }),
    enabled: !!user?.data?.id,
  });

  const handleOpenTooltip = () => {
    setOpenTooltip(!openTooltip);
  };

  const handleAddToPlaylist = async (id: any) => {
    await playlistsAddTrackToPlaylist({
      body: song,
      path: { playlist_id: id },
    });
  };

  return (
    <>
      <div
        className={`flex flex-col h-full gap-y-0.5 transition ${expand ? "opacity-100 " : "opacity-0"}`}
      >
        <div className={"grow flex relative"}>
          <div className={"z-30 justify-between w-full px-2 pt-2"}>
            <div className={"flex justify-between z-20 w-full"}>
              <button
                onClick={() => setExpand(false)}
                className={
                  "rounded-3xl section-bg-color p-5 flex items-center justify-center"
                }
              >
                <IoClose size={14} className={"text-color"} />
              </button>
              <div
                onClick={handleOpenTooltip}
                className={
                  "addplaylist relative rounded-3xl section-bg-color p-5 flex items-center justify-center"
                }
              >
                <PlaylistIcon size={14} className={"text-color"} />

                <div
                  className={`${!openTooltip && "opacity-0 hidden"} border section-separator-color-border tooltip section-bg-color overflow-hidden transition opacity-100`}
                >
                  <div
                    className={
                      "text-left section-separator-color text-[12px] py-1 px-2 uppercase font-thin"
                    }
                  >
                    Add to playlist
                  </div>
                  <div className={"px-3 max-h-[192px] overflow-y-auto"}>
                    {data?.data &&
                      data.data.playlists.map((playlist) => (
                        <>
                          <div
                            key={playlist.id}
                            className={"py-3 flex gap-x-2 cursor-pointer"}
                            onClick={() => handleAddToPlaylist(playlist.id)}
                          >
                            <div
                              className={"bg-black w-10 h-10 rounded-3xl"}
                            ></div>

                            <div
                              className={
                                "flex flex-col items-start justify-center "
                              }
                            >
                              <h4
                                className={
                                  "font-medium text-color leading-5 truncate"
                                }
                              >
                                {playlist.title}
                              </h4>
                              <p
                                className={
                                  " text-[12px] subtitle-text-color truncate"
                                }
                              >
                                {"No tracks("}
                              </p>
                            </div>
                          </div>
                          <Divider />
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              "rounded-3xl border section-separator-color-border section-bg-color h-60 w-60 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            }
          >
            <div
              className={
                "rounded-3xl bg-black h-52 w-52 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              }
            >
              <Image
                src={song.thumbnail}
                alt={"image"}
                width={150}
                height={150}
                className={"rounded-3xl w-full h-full "}
              />
            </div>
          </div>

          <div className={""} onDoubleClick={() => {}}></div>

          <div className={""} onDoubleClick={() => {}}></div>
        </div>
        <div
          className={
            "p-6 border section-bg-color section-separator-color-border rounded-3xl"
          }
        >
          <div className={"text-center mb-3"}>
            <h2 className={"text-color font-medium"}>{song.title}</h2>
            <p className={"subtitle-text-color text-[12px]"}>
              {song.authors &&
                song.authors.map((author) => author.name).join(", ")}
            </p>
          </div>
          <div
            className={
              "flex justify-between items-center text-[12px] subtitle-text-color mb-1.5"
            }
          >
            <span>{formatTime(currentTime)}</span>
            <span>
              {duration && !isNaN(duration) && formatTime(duration)
                ? formatTime(duration)
                : "00:00"}
            </span>
          </div>
          <div className={"relative flex justify-center items-center"}>
            <input
              type="range"
              className={"progress-bar section-separator-color"}
              value={audioProgress}
              ref={progressRefValue}
              onChange={changeProgress}
            />
          </div>
        </div>
        <div
          className={
            "rounded-3xl p-3 border section-bg-color section-separator-color-border flex items-center justify-center sm:justify-between"
          }
        >
          <div
            className={"w-[120px] items-center gap-x-2 hidden sm:flex"}
          ></div>
          <div className={"flex flex-row items-center justify-center gap-x-1"}>
            <div
              onClick={function () {
                setLooped(!looped);
                setShuffled(false);
              }}
              className={`shadow-xl flex items-center justify-center rounded-full cursor-pointer p-4 transition ${looped ? "button-color" : "section-separator-color"}`}
            >
              <TbRepeat size={16} className={"text-color"} />
            </div>
            <div
              onClick={onPlayPrevious}
              className={
                "shadow-xl section-separator-color flex items-center justify-center transition rounded-full cursor-pointer p-4"
              }
            >
              <IoPlaySkipBack size={16} className={"text-color"} />
            </div>
            <div
              onClick={togglePlayPause}
              className={`cursor-pointer flex items-center justify-center shadow-xl transition rounded-full p-5 ${!isPlaying ? "button-color" : "section-separator-color"}`}
            >
              <Icon size={20} className={"text-color"} />
            </div>
            <div
              onClick={onPlayNext}
              className={
                "shadow-xl section-separator-color flex items-center justify-center transition rounded-full cursor-pointer p-4"
              }
            >
              <IoPlaySkipForward size={16} className={"text-color"} />
            </div>
            <div
              onClick={handleShuffle}
              className={`shadow-xl flex items-center justify-center rounded-full cursor-pointer p-4 transition ${shuffled ? "button-color" : "section-separator-color"}`}
            >
              <PiShuffleBold size={16} className={"text-color"} />
            </div>
          </div>
          <div className={" w-[120px] items-center gap-x-2 hidden sm:flex"}>
            <VolumeIcon
              size={20}
              onClick={toggleMute}
              className={"cursor-pointer text-color"}
            />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={
                "w-[80px] h-[5px] progress-bar section-separator-color"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpandedPlayer;
