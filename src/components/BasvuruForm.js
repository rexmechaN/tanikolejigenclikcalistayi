import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const BasvuruForm = ({ option }) => {

    const navigate = useNavigate();

    const questions = {
        Delege: [
            //{label: "İsim Soyisim", name: "name", type:"text"},
            //{label: "Okul", name: "school", type:"text"},
            //{label: "Sınıf", name: "grade", type:"text"},
            //{label: "Telefon Numarası", name: "phone", type:"text"},
        ]
    }

    const logOut = () => {
        signOut(auth).then(() => {
            navigate("/")
        })
    }

    return (
        <div className="basvuru-form-container">
            <form className="basvuru-form">
                <button onClick={logOut} className="log-out button">Çıkış Yap</button>
                <p style={{color: "white"}}>Oturum açıldı</p>
                {questions[option].map(question => (
                    <div key={question.name}>
                        <label htmlFor={question.name}>{question.label}</label>
                        {question.type === "text" &&
                            <input type="text" name={question.name} id={question.name} />
                        }
                        {question.type === "textarea" &&
                            <textarea cols="30" rows="10" name={question.name} id={question.name}></textarea>
                        }
                    </div>
                ))}
            </form>
        </div>
    );
};

export default BasvuruForm;
