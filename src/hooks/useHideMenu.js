import { useContext, useEffect } from "react"
import { UiContext } from "../context/UiContext"

export const useHideMenu = (ocultar) => {
    const { onMostrarMenu, onOcultarMenu } = useContext(UiContext);
    useEffect(() => {
        if (ocultar) {
            onOcultarMenu();
        } else {
            onMostrarMenu();
        }
    }, [ocultar, onMostrarMenu, onOcultarMenu]);
}
