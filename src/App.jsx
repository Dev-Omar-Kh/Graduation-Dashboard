import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home/Home';
import Officers from './Pages/Officers/Officers';
import Violations from './Pages/Violations-Management/Violations';
import { useTranslation } from 'react-i18next';
import Login from './Authentication/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SubLayout from './Layouts/SubLayout';
import ViolationDetails from './Pages/Violations-Management/ViolationDetails';
import OfficerProfile from './Pages/Officers/OfficerProfile';
import Reports from './Pages/Reports/Reports';
import ReportDetails from './Pages/Reports/ReportDetails';
import OwnerDetails from './Pages/Violations-Management/OwnerDetails';
import AuditLogs from './Pages/Audit-Logs/AuditLogs';
import Admins from './Pages/Admins/Admins';
import AdminProfile from './Pages/Admins/AdminProfile';
import AddOfficer from './Pages/Officers/Officers-Actions/AddOfficer';
import UpdateOfficer from './Pages/Officers/Officers-Actions/UpdateOfficer';
import AddAdmin from './Pages/Admins/Admins-Actions/AddAdmin';
import UpdateAdmin from './Pages/Admins/Admins-Actions/UpdateAdmin';
import AddViolation from './Pages/Violations-Management/Violations-Actions/AddViolation';
import UpdateViolation from './Pages/Violations-Management/Violations-Actions/UpdateViolation';

const routes = createBrowserRouter([

    {path: '/', element: <MainLayout />, children: [

        {path: '/', element: <Home />},

        {path: '/officers', element: <SubLayout />, children: [
            {path: '/officers', element: <Officers />},
            {path: '/officers/profile/:id', element: <OfficerProfile />},
            {path: '/officers/add-new-officer', element: <AddOfficer />},
            {path: '/officers/update-officer-data/:id', element: <UpdateOfficer />},
        ]},

        {path: '/admins', element: <SubLayout />, children: [
            {path: '/admins', element: <Admins />},
            {path: '/admins/add-admin', element: <AddAdmin />},
            {path: '/admins/update-admin-data/:id', element: <UpdateAdmin />},
            {path: '/admins/profile/:id', element: <AdminProfile />},
        ]},

        {path: '/V-Management', element: <SubLayout />, children: [
            {path: '/V-Management', element: <Violations />},
            {path: '/V-Management/violation/:id', element: <ViolationDetails />},
            {path: '/V-Management/add-violation', element: <AddViolation />},
            {path: '/V-Management/update-violation-data/:id', element: <UpdateViolation />},
            {path: '/V-Management/violation/:id/car-owner/:ownerId', element: <OwnerDetails />}
        ]},

        {path: '/V-Reports', element: <SubLayout />, children: [
            {path: '/V-Reports', element: <Reports />},
            {path: '/V-Reports/report/:id', element: <ReportDetails />}
        ]},

        {path: '/adult-logs', element: <AuditLogs />},

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