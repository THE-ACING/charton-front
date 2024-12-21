import Image from "next/image";
import { FaPlay } from "react-icons/fa6";

const SongCard = () => {
  return (
    <div
      className={
        "border-2 section-bg-border-color section-bg-color rounded-3xl relative overflow-hidden flex flex-col min-w-[300px] min-h-[250px] active:scale-95 transition"
      }
    >
      <Image
        src={"/images/favBg-4.jpg"}
        alt={""}
        width={100}
        height={100}
        className={"absolute object-cover w-full bottom-0 right-0"}
      />
      <h2 className={"font-bold text-[20px] absolute top-5 left-5"}>
        Workout Mix
      </h2>
      <p className={"text-[13px] absolute top-12 left-5 subtitle-text-color"}>
        approximately 42min
      </p>
      <div className={"grow bg-transparent p-10 relative"}>
        <FaPlay
          size={20}
          className={"absolute bottom-4 right-4 text-color z-10"}
        />
      </div>
      <div
        className={
          "border-2 section-bg-border-color section-bg-color py-6 px-5 z-10 rounded-tl-3xl flex gap-x-2 items-center "
        }
      >
        <div
          className={
            "w-14 h-14 border-2 section-separator-color-border rounded-full flex items-center justify-center text-color"
          }
        >
          42m
        </div>
        <div className={"max-w-[170px] "}>
          <h2 className={"font-medium text-[16px] leading-5"}>21 Tracks</h2>
          <p className={"subtitle-text-color truncate text-[13px] leading-5"}>
            Lana Del Rey, 21 Savage and others...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
