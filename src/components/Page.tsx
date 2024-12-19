"use client";

import { backButton } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  useEffect(() => {
    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  useEffect(() => {

    document.body.addEventListener(
      "dblclick",
      function (event) {
        event.preventDefault();
      },
      { passive: false },
    );

    document.body.addEventListener("gesturestart", function (e) {
      e.preventDefault();
      // special hack to prevent zoom-to-tabs gesture in safari
      document.body.style.zoom = 0.99;
    });

    document.body.addEventListener("gesturechange", function (e) {
      e.preventDefault();
      // special hack to prevent zoom-to-tabs gesture in safari
      document.body.style.zoom = 0.99;
    });

    document.body.addEventListener("gestureend", function (e) {
      e.preventDefault();
      // special hack to prevent zoom-to-tabs gesture in safari
      document.body.style.zoom = 0.99;
    });
  }, []);

  return (
    <div className={"pb-40 relative"}>
      {children}
      <p
        className={
          "absolute left-[50%] translate-x-[-50%] bottom-32 text-color"
        }
      >
        (◕‿‿◕｡)
      </p>
    </div>
  );
}
