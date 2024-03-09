import { ThemeContextProvider } from "@/components/provider";
import localFont from "next/font/local";
import "./globals.css";
import "./bubbleChat.css";

const pixeloidBold = localFont({
  src: [
    {
      path: "../public/fonts/PixeloidBold.ttf",
      weight: "400",
    },
  ],
  variable: "--font-pixeloid-bold",
});

export const metadata = {
  title: "Youtube Character Live Chat",
  description:
    "Enhance your livestream with YouTube Character Live Chat! Witness ordinary comments evolve into delightful personalities, elevating audience engagement. Immerse yourself and viewers in a realm of fun and creativity, transforming every comment into a memorable moment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pixeloidBold.variable}`}>
      <body className="font-montserrat">
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
