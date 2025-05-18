'use client'
import "../globals.css";
import Sidebar from "./sidebar";
import Head from "next/head";



export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>Grow-Together - Building Strategic Business Partnerships</title>
                <meta name="description" content="Grow-Together helps businesses form strategic partnerships through AI-powered matchmaking, secure communication, and structured business connections." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <body
            >

                {children}
                <Sidebar/>

            </body>
        </html>
    );
}
