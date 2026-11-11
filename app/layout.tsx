import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata: Metadata = { title: "TB GUITARES — Instruments de caractère", description: "Sélection de guitares électriques et acoustiques haut de gamme." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body><Header/><main>{children}</main><Footer/></body></html>}