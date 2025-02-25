"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 1000,
        style: {
          background: "var(--tg-theme-section-bg-color",
          color: "var(--tg-theme-text-color)",
          border: "1px solid",
          borderColor: "var(--tg-theme-section-separator-color)",
        },
        success: {
          iconTheme: {
            primary: "var(--tg-theme-link-color)",
            secondary: "var(--tg-theme-text-color)",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
