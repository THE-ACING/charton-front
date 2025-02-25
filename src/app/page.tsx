"use client";

// import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";

import HomeLayout from "@/components/HomeLayout/HomeLayout";
import { useEffect } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { userSetReferrer } from "@/client";

export default function Home() {
  // const t = useTranslations("i18n");
  const initDataStartParam = useSignal(initData.startParam);

  useEffect(() => {
    if (initDataStartParam) {
      userSetReferrer({ body: { referrer_id: initDataStartParam } });
    }
  }, [initDataStartParam]);

  return (
    <Page back={false}>
      <HomeLayout />
    </Page>
  );
}
