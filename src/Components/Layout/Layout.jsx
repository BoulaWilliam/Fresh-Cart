import React from 'react'
import Footer from './../Footer/Footer';
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className="container py-12 flex-grow px-5">
                <Outlet className="flex-grow"></Outlet>
            </div>
            <Footer />
            </div>
        </>
    )
}
