import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";
import Notification from "../components/Notification";

// Outlet viene de react-router-dom para poder mostrarlo en todas las pestañas sin repetir codigo

export default function Layout() {

    const {loadFromStorage} = useAppStore()

    useEffect(() => {
        loadFromStorage()
    },[])

    return (
        <>
            <Header/>

            <main className="container mx-auto py-16">
                <Outlet/>
            </main>

            <Modal/>

            <Notification/>
        </>
    )
}
