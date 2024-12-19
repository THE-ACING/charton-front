import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Root } from "@/components/Root/Root";
import { I18nProvider } from "@/core/i18n/provider";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import NavigationBar from "@/components/NavigationBar";
import Content from "@/components/Content";
import Player from "@/components/Player/Player";
import React from "react";
import Providers from "@/app/providers";
// import DisableZoom from "@/utils/DisableZoom";

export const metadata: Metadata = {
  title: "Charton",
  description: "New Age Music App just in Telegram",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" href="/images/favicon-96x96.png" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />

      </head>
      <body>
        <I18nProvider>
          <Providers>
            <Root>

              <div className={"relative h-[100vh] flex flex-col"}>
                <Content>{children}</Content>
                <NavigationBar />
              </div>
              <Player />
            </Root>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
