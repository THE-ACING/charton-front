import { useClientOnce } from "@/hooks/useClientOnce";
import {
  isTMA,
  type LaunchParams,
  mockTelegramEnv,
  parseInitData,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";

export function useTelegramMock(): void {
  useClientOnce(() => {
    if (!sessionStorage.getItem("env-mocked") && isTMA("simple")) {
      return;
    }

    let lp: LaunchParams | undefined;
    try {
      lp = retrieveLaunchParams();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      const initDataRaw = process.env.NEXT_PUBLIC_INIT_DATA;

      lp = {
        themeParams: {
          accentTextColor: "#6ab2f2",
          bgColor: "#17212b",
          buttonColor: "#5288c1",
          buttonTextColor: "#ffffff",
          destructiveTextColor: "#ec3942",
          headerBgColor: "#17212b",
          hintColor: "#708499",
          linkColor: "#6ab3f3",
          secondaryBgColor: "#232e3c",
          sectionBgColor: "#17212b",
          sectionHeaderTextColor: "#6ab3f3",
          subtitleTextColor: "#708499",
          textColor: "#f5f5f5",
        },
        initData: parseInitData(initDataRaw),
        initDataRaw,
        version: "8",
        platform: "tdesktop",
      };
    }

    sessionStorage.setItem("env-mocked", "1");
    mockTelegramEnv(lp);
    console.warn(
      "⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.",
    );
  });
}
