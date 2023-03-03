import {Navigate, useLocation} from "react-router-dom";
import AuthScreen from "../components/AuthScreen";
import Loading from "../components/Loading";
import NotFound from "./NotFound";
import { useMainContext } from "../contexts/MainContext";
import Sent from "./Sent";
import {lazy, Suspense } from "react";

const LazyBasvuruForm = lazy(() => {
    return Promise.all([
        import("../components/ApplicationForm"),
        new Promise(resolve => setTimeout(resolve, 1000))
    ])
        .then(([moduleExports]) => moduleExports);
});

const ApplicationRedirection = () => {

    const { user, isApplied, admin } = useMainContext();
    const { pathname } = useLocation();

    if(!user)
        return <AuthScreen />

    else if(admin)
        return <Navigate to="/panel" />

    else if(isApplied)
        return <Sent />

    else if(pathname.includes("/basvuru/delege"))
        return <Suspense fallback={<Loading height={"80vh"} />}><LazyBasvuruForm option="Delege" /></Suspense>

    else if(pathname.includes("/basvuru/gozlemci"))
        return <Suspense fallback={<Loading height={"80vh"} />}><LazyBasvuruForm option="Gözlemci" /></Suspense>

    else if(pathname.includes("/basvuru/basin"))
        return <Suspense fallback={<Loading height={"80vh"} />}><LazyBasvuruForm option="Basın" /></Suspense>

    else if(pathname.includes("/basvuru/komitedivani"))
        return <Suspense fallback={<Loading height={"80vh"} />}><LazyBasvuruForm option="Komite Divanı" /></Suspense>

    else
        return <NotFound />
};

export default ApplicationRedirection;
