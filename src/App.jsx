import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home/Home';
import Officers from './Pages/Officers/Officers';
import VehicleM from './Pages/Vehicle-Management/VehicleM';
import { useTranslation } from 'react-i18next';
import Login from './Authentication/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SubLayout from './Layouts/SubLayout';
import VehicleDetails from './Pages/Vehicle-Management/VehicleDetails';
import OfficerProfile from './Pages/Officers/OfficerProfile';

const routes = createBrowserRouter([

    {path: '/', element: <MainLayout />, children: [

        {path: '/', element: <Home />},

        {path: '/officers', element: <SubLayout />, children: [
            {path: '/officers', element: <Officers />},
            {path: '/officers/profile/:id', element: <OfficerProfile />},
        ]},

        {path: '/V-Management', element: <SubLayout />, children: [
            {path: '/V-Management', element: <VehicleM />},
            {path: '/V-Management/vehicle/:id', element: <VehicleDetails />}
        ]},

    ]},

    {path: '/login', element: <Login />}

]);

export default function App() {

    const {i18n} = useTranslation();
    const queryClient = new QueryClient();

    // ====== save-language ====== //

    useEffect(() => {

        const savedLang = localStorage.getItem('language');

        if(savedLang && i18n.language !== savedLang){
            i18n.changeLanguage(savedLang);
        }

        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    }, [i18n , i18n.language]);

    return <React.Fragment>

        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
        </QueryClientProvider>

    </React.Fragment>

}