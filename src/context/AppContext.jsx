import { createContext } from "react";
import {doctors} from '../assets/assets/assets_frontend/assets'
export const AppContext = createContext()

const AppContextProvider = (props) => {
    //whatever we  create in the value object we can access it in any component
    const currencySymbol = '₹'
    const value = {
        doctors, currencySymbol
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider