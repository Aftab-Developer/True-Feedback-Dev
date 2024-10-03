
import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";


const poppins = Poppins({
  weight : "500" ,
  subsets :["latin"] ,
  display: "swap",
 
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >  
      <AuthProvider>
        {children} 
        <Toaster />  
        </AuthProvider>

      </body>
    </html>
  );
}
