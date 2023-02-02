import {useLocation} from "react-router-dom";
import BasvuruForm from "../components/BasvuruForm";
import AuthScreen from "../components/AuthScreen";
import NotFound from "./NotFound";
import {useMainContext} from "../contexts/MainContext";

const BasvuruRedirection = () => {

    const { user } = useMainContext();
    const { pathname } = useLocation();

    if(!user)
        return <AuthScreen />

    else if(pathname.includes("/basvuru/delege"))
        return <BasvuruForm option="Delege" />;

    else if(pathname.includes("/basvuru/gozlemci"))
        return <BasvuruForm option="Gözlemci" />

    else if(pathname.includes("/basvuru/basin"))
        return <BasvuruForm option="Basın" />

    else if(pathname.includes("/basvuru/komite-baskan-vekili"))
        return <BasvuruForm option="Komite Başkan Vekili" />

    else
        return <NotFound />
};

export default BasvuruRedirection;
