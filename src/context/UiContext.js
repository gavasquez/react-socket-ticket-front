import React, { createContext, useState } from 'react'

export const UiContext = createContext();

export const UiProvider = ({ children }) => {

    const [ocultarMenu, setOcultarMenu] = useState(false);

    const onMostrarMenu = () => {
        setOcultarMenu(false);
    }

    const onOcultarMenu = () => {
        setOcultarMenu(true);
    }

    return (
        <UiContext.Provider value={{
            //* Propiedades
            ocultarMenu,
            //* Metodos
            onMostrarMenu, 
            onOcultarMenu
        }}>
            {children}
        </UiContext.Provider>
    )
}
