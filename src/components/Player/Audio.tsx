import React, { MutableRefObject } from "react";

interface AudioProps {
  autoplay: boolean;
  refValue: MutableRefObject<HTMLAudioElement | null>;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  source: string;
  onEnded: () => void;
  looped: boolean;
  preload: string;
}

const Audio: React.FC<AudioProps> = ({
  autoplay,
  refValue,
  onTimeUpdate,
  onLoadedMetadata,
  source,
  onEnded,
  looped,
  preload,
}) => {
  console.log("audio");

  return (
    <audio
      autoPlay={autoplay}
      ref={refValue}
      onTimeUpdate={onTimeUpdate}
      onLoadedMetadata={onLoadedMetadata}
      src={source}
      onEnded={onEnded}
      loop={looped}
      preload={preload}
    />
  );
};

export default Audio;
