import Image from "next/image";
import {Divider} from "@telegram-apps/telegram-ui";

interface ReferralCardProps {
    name: string;
    image: string;
    length: number;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ name, image, length }) => {
    return (
        <>
            <div className={"flex items-center justify-between py-3 "}>
                <div className={"flex items-center gap-x-3"}>
                    <div className={"w-12 h-12 bg-black rounded-full overflow-hidden"}>
                        <Image src={image} alt={"image"} width={50} height={50}  />
                    </div>
                    <h3 className={"text-[16px] font-semibold"}>{name}</h3>
                </div>

                {/*<p className={"text-[14px] font-medium"}>243h</p>*/}
            </div>

            {length > 1 && (
                <Divider />
            )}
        </>

    );
};

export default ReferralCard;
