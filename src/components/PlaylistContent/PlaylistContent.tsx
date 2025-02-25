"use client";

import SongItem from "@/components/SongItem/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Track } from "@/client";
import { useState } from "react";

interface LikedContentProps {
  songs: Array<Track> | undefined;
  playlistId: string;
}

const LikedContent: React.FC<LikedContentProps> = ({ songs, playlistId }) => {
  const onPlay = useOnPlay(songs);

  const [openId, setId] = useState<string | null>(null);

  if (songs?.length === 0) {
    return (
      <div className="mt-2 text-neutral-400 text-center">
        No songs available.
      </div>
    );
  }
  return (
    <div>
      {songs?.map((item: Track) => (
        <SongItem
          key={item.id}
          onClick={(id: string) => onPlay(id)}
          data={item}
          isPlaylist={true}
          isOpen={item.id === openId}
          clickHandler={() =>
            item.id === openId ? setId(null) : setId(item.id)
          }
          playlistId={playlistId}
        />
      ))}
    </div>
  );
};

export default LikedContent;
