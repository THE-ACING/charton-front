import usePlayer from "./usePlayerStore";
import { Track } from "@/client";

const useOnPlay = (songs: Array<Track> | undefined) => {
  const player = usePlayer();
  const onPlay = (id: string) => {
    // if (!user) {
    //     return authModal.onOpen();
    // }

    player.setId(id);
    if (songs) {
      player.setIds(songs?.map((song) => song.id));
    }

  };

  return onPlay;
};

export default useOnPlay;
