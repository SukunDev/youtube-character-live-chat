import { ThemeContextProvider } from "@/components/provider";
import "./globals.css";

export const metadata = {
  title: "Youtube Character Live Chat",
  description:
    "Enhance your livestream with YouTube Character Live Chat! Witness ordinary comments evolve into delightful personalities, elevating audience engagement. Immerse yourself and viewers in a realm of fun and creativity, transforming every comment into a memorable moment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-montserrat">
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
