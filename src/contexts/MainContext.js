import {createContext, useContext, useState} from "react";

const MainContext = createContext({})

const MainContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);
    const [option, setOption] = useState("");
    const [durum, setDurum] = useState(null);

    const values = {
        user, setUser,
        authLoading, setAuthLoading,
        isApplied, setIsApplied,
        option, setOption,
        durum, setDurum
    }

    return (
        <MainContext.Provider value={values}>
            { children }
        </MainContext.Provider>
    )
}

const useMainContext = () => {
    return useContext(MainContext)
}

export {
    MainContextProvider,
    useMainContext
}