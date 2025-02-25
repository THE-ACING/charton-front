"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { FiClipboard } from "react-icons/fi";
import { Page } from "@/components/Page";
import { openTelegramLink } from "@telegram-apps/sdk-react";
import {Button, Divider} from "@telegram-apps/telegram-ui";
import { IoPeople } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import {userGetReferrals, userSetReferrer} from "@/client";
import useUserAuth from "@/hooks/useUserAuth";
import {useEffect, useState} from "react";
import ReferralCard from "@/components/ReferralCard/ReferralCard";

const Friends = () => {
  const user = useUserAuth();

  const [referrals, setReferrals] = useState<string[]>([]);
  const [referrer, setReferrer] = useState<string | null>(null);

  const botUrl = process.env.NEXT_PUBLIC_BOT_URL;
  const refCode = user?.data?.id;
  const refLink =
    botUrl + `/${process.env.NEXT_PUBLIC_BOT_APP_NAME}?startapp=${refCode}`;
  const shareText = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=Join my app!`;

  const copylink = () => {
    navigator.clipboard.writeText(refLink);
    toast.success("Copied!", {
      id: "clipboard",
    });
  };

  const handleClick = () => {
    openTelegramLink(shareText);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`friends`, user?.data?.id],
    queryFn: async () =>
      await userGetReferrals({ path: { user_id: user?.data?.id! } }),
    enabled: !!user?.data?.id,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Page back={true}>
      <div className={"px-3 py-5 box flex flex-col text-color"}>
        <div
          className={"flex justify-center items-center flex-col gap-y-1 mb-4"}
        >
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

          <h2 className={"text-center text-[1.2rem] font-bold text-color"}>
            Friends
          </h2>
        </div>

        <div
          className={
            " cursor-pointer relative w-full p-3 section-bg-color  subtitle-text-color rounded-xl text-[14px]  group overflow-hidden transition mb-1 truncate pr-10"
          }
          onClick={copylink}
        >
          {refLink}
          <FiClipboard
            size={20}
            className={
              "h-full w-[30px] pr-2 subtitle-text-color absolute opacity-100 right-0 top-[50%] translate-y-[-50%] group-active:opacity-0 transition"
            }
          />
        </div>
        <Button
          onClick={handleClick}
          before={<IoPeople />}
          mode="filled"
          size="m"
        >
          Invite Friends
        </Button>

        <h2 className={"text-[16px] font-semibold mt-4 text-color"}>
          Your Gang
        </h2>

        <div className={"mt-1 px-4 section-bg-color rounded-xl"}>
          {isLoading && <div>Loading...</div>}
          {data?.data &&
            data.data.users.map((user) => (
              <ReferralCard
                key={user.id}
                name={user.username}
                image={user.photo_url}
                length={data.data.users.length}
              />
            ))}
        </div>
      </div>
    </Page>
  );
};

export default Friends;
