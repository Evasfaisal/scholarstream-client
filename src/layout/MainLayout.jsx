import React from 'react';
import DynamicTitle from '../components/DynamicTitle';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';


const MainLayout = () => {
    return (
        <>
            <DynamicTitle />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;