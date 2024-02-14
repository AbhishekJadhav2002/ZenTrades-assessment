import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZenTrades Assessment | Abhishek Jadhav",
  description: "ZenTrades Assessment | Abhishek Jadhav",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-center py-2">
          <Link href={"/plan"} className="px-4 py-2 border rounded-md">
            Get My Jobs
          </Link>
        </nav>
        {children}

        <ToastContainer />
      </body>
    </html>
  );
}
