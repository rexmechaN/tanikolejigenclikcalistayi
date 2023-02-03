import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Basvuru from "./pages/Basvuru";
import {useEffect} from "react";
import { onAuthStateChanged, auth, doesUserExist, registerUser } from "./firebase";
import {useMainContext} from "./contexts/MainContext";
import BasvuruRedirection from "./pages/BasvuruRedirection";
import NotFound from "./pages/NotFound";

function App() {

    const { setUser, setAuthLoading, setIsApplied, setOption, setDurum } = useMainContext()

    const { pathname } = useLocation()

    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [pathname]);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log(user)
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
            <Route path="/basvuru" element={<Basvuru />}/>
            <Route path="/basvuru/*" element={<BasvuruRedirection />}/>
            <Route path="/*" element={<NotFound />}/>
        </Routes>
    </div>
  );
}

export default App;
