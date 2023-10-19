import React from 'react'
import { RouterPage } from './pages/RouterPage'
import { BrowserRouter } from "react-router-dom";
import { UiProvider } from './context/UiContext';
import { SocketProvider } from './context/SocketContext';

export const TicketApp = () => {
    return (
        <BrowserRouter>
            <SocketProvider>
                <UiProvider>
                    <RouterPage />
                </UiProvider>
            </SocketProvider>
        </BrowserRouter>
    )
}
