import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { auth } from "../firebase";

const AuthScreen = () => {

    const [email, setEmail] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    const [show, setShow] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [differentDevice, setDifferentDevice] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        setLoading(true)

        const localStorageEmail = window.localStorage.getItem("emailForSignIn")

        if(isSignInWithEmailLink(auth, window.location.href)) {
            if(!localStorageEmail) {
                setLoading(false)
                setShow(true)
                setDifferentDevice(true)
            }
            else {
                signInWithEmailLink(auth, localStorageEmail, window.location.href)
                    .then(() => {
                        window.localStorage.removeItem('emailForSignIn');
                        setLoading(false)
                    })
                    .catch((error) => {
                        if(error.code==="auth/invalid-action-code")
                            setError("Bu oturum açma bağlantısının süresi geçmiş. Lütfen yeni bir bağlantı alın.")
                        else {
                            setLoading(false)
                            setDifferentDevice(true)
                        }
                    });
            }
        }
        else {
            setShow(true)
            setLoading(false)
        }
    }, [])

    const handleSignIn = e => {
        e.preventDefault()
        setShow(true)
        setError(null)
        setLoading(true)
        const actionCodeSettings = {
            url: `https://tanigc2023.web.app${pathname}`,
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(auth, email.trim(), actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email.trim())
                setShow(false)
                setIsSent(true)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                setError("Lütfen geçerli bir mail adresi girin.")
            });
    }

    const handleClick = () => {
        setLoading(true)
        setError(null)
        const localEmail = email.trim()
        signInWithEmailLink(auth, localEmail, window.location.href)
            .then(() => {
                window.localStorage.removeItem('emailForSignIn');
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error, error.code)
                if(error.code==="auth/invalid-action-code")
                    setError("Bu oturum açma bağlantısının süresi geçmiş. Lütfen yeni bir bağlantı alın.")
                else if(error.code==="auth/invalid-email")
                    setError("Lütfen mail adresinizi doğru yazdığınızdan emin olun.")
                else setError("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
            });
    }

    const handleCheckbox = (e) => {
        if(e.target.checked) {
            setIsChecked(true)
        }
        else {
            setIsChecked(false)
        }
    }

    if(differentDevice)
        return (
            <div className="auth-screen-container">
                <div className="auth-screen">
                    {error && <p className="alert alert-danger">{error}</p>}
                    <h1>Lütfen e-posta adresinizi tekrardan girin</h1>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email"/>
                    <button onClick={handleClick} disabled={!isChecked || loading} className="button">Doğrula</button>
                    <div style={{display: show ? "block" : "none"}} className="kvkk-form-container">
                        <input onClick={handleCheckbox} type="checkbox" id="kvkk-checkbox" />
                        <label htmlFor="kvkk-checkbox"><Link to="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link> ve <Link to="/kvkk-acik-riza-metni">KVKK Açık Rıza Metni</Link>'ni okudum, kabul ediyorum.</label>
                    </div>
                </div>
            </div>
        )

    return (
        <div className="auth-screen-container">
            <div className="auth-screen">
                {error && <p className="alert alert-danger">{error}</p>}
                <h1>E-posta adresiniz ile oturum açın</h1>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email"/>
                <button onClick={handleSignIn} disabled={!isChecked || isSent || loading} className="button">Doğrula</button>
                {isSent &&
                    <>
                        <p className="alert alert-success">E-posta adresinize gönderilen bağlantı ile oturum açabilirsiniz.</p>
                        <p className="alert alert-warning">Gelen kutunuzda bir mail bulamıyorsanız. Spam kutunuzu kontrol etmeyi unutmayın.</p>
                        <p className="alert alert-danger">Bizden kaynaklı olmayan bir sorundan ötürü maillerin ulaşmasında 5-10 dakika arası bir gecikme yaşanabilir. Lütfen üst üste mail göndermeye çalışmayınız. Sabrınız için teşekkürler.</p>
                    </>
                }
                <div style={{display: show ? "block" : "none"}} className="kvkk-form-container">
                    <input onClick={handleCheckbox} type="checkbox" id="kvkk-checkbox" />
                    <label htmlFor="kvkk-checkbox"><Link to="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</Link> ve <Link to="/kvkk-acik-riza-metni">KVKK Açık Rıza Metni</Link>'ni okudum, kabul ediyorum.</label>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
