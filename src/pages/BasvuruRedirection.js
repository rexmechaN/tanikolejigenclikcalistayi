import {useLocation} from "react-router-dom";
import AuthScreen from "../components/AuthScreen";
import NotFound from "./NotFound";
import { useMainContext } from "../contexts/MainContext";
import Sent from "./Sent";
import Loading from "./Loading";
import {lazy, Suspense } from "react";

const LazyBasvuruForm = lazy(() => {
    return Promise.all([
        import("../components/BasvuruForm"),
        new Promise(resolve => setTimeout(resolve, 1000))
    ])
        .then(([moduleExports]) => moduleExports);
});

const BasvuruRedirection = () => {

    const { user, isApplied, authLoading } = useMainContext();
    const { pathname } = useLocation();

    if(authLoading)
        return <Loading />

    else if(!user)
        return <AuthScreen />

    else if(isApplied)
        return <Sent />

    else if(pathname.includes("/basvuru/delege"))
        return <Suspense fallback={<Loading />}><LazyBasvuruForm option="Delege" /></Suspense>

    else if(pathname.includes("/basvuru/gozlemci"))
        return <Suspense fallback={<Loading />}><LazyBasvuruForm option="Gözlemci" /></Suspense>

    else if(pathname.includes("/basvuru/basin"))
        return <Suspense fallback={<Loading />}><LazyBasvuruForm option="Basın" /></Suspense>

    else if(pathname.includes("/basvuru/komite-baskan-vekili"))
        return <Suspense fallback={<Loading />}><LazyBasvuruForm option="Komite Başkan Vekili" /></Suspense>

    else
        return <NotFound />
};

export default BasvuruRedirection;
