import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Application from "./pages/Application";
import {useEffect} from "react";
import { onAuthStateChanged, auth, doesUserExist, registerUser } from "./firebase";
import {useMainContext} from "./contexts/MainContext";
import ApplicationRedirection from "./pages/ApplicationRedirection";
import NotFound from "./pages/NotFound";
import Panel from "./pages/Panel/index";
import Loading from "./components/Loading";
import Konum from "./pages/Konum";
import Footer from "./components/Footer";

function App() {

    const { admin, setUser, setAuthLoading, setIsApplied, setOption, setDurum, setAdmin } = useMainContext()

    const { pathname } = useLocation()

    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [pathname]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                if(user.uid === process.env.REACT_APP_ADMIN_ID) {
                    setUser(user)
                    setAuthLoading(false)
                    return setIsApplied(true)
                }
                doesUserExist(user)
                    .then(result => {
                        if(result.exists) {
                            if(result.data.isApplied) {
                                setOption(result.data.option)
                                setDurum(result.data.durum)
                                setIsApplied(true)
                            }
                            else {
                                setOption("")
                                setDurum(null)
                                setIsApplied(false)
                            }
                            console.log(result.data.admin)
                            setAdmin(result.data.admin)
                            setAuthLoading(false)
                        }
                        else {
                            registerUser(user).then(() => {
                                setOption("")
                                setDurum(null)
                                setIsApplied(false)
                                setAuthLoading(false)
                            })
                        }
                    })
                    .catch((e) => {console.log(e.message)})
            }
            else {
                setOption("")
                setDurum(null)
                setIsApplied(false)
                setAuthLoading(false)
            }
            setUser(user)
        })

    }, [])

  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/basvuru" element={admin ? <Navigate to={"/panel"}/> : <Application />}/>
            <Route path="/basvuru/*" element={<ApplicationRedirection />}/>
            <Route path="/konum" element={<Konum />}/>
            <Route path="/panel" element={<Panel />} />
            <Route path="/loading" element={<Loading height={"80vh"} />} />
            <Route path="/*" element={<NotFound />}/>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
