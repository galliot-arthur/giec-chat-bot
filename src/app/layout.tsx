import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AskGiec",
  description: "AskGiec by EY Fabernovel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={montserrat.className}>
        <div className="bg-black w-full p-2 py-6 text-white font-bold sm:text-2xl text-light shadow flex items-center justify-center">
          <img className="mr-3" src="/round-logo.svg" alt="fabernovel logo" />
          <div>
            AskGiec<span className="font-light mx-2">by</span>EY Fabernovel
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
