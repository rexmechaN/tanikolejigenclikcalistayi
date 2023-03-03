import {createContext, useContext, useState} from "react";

const secenekler = [
    { disabled: false, name: "Komite Divanı", oName: "komitedivani", description: "Komite divanları akademik tecrübeleri olan ve daha önceden delegelik yapmış, komite başkanı ve yardımcısıdır. Divan üyeleri komite çalışma rehberlerini hazırlar ve kendi komitelerindeki delegelerin çözüm tasklakları oluşturmalarına yardımcı olurlar." },
    { disabled: true, name: 'Delege', oName: 'delege', description: "Delegeler konferansın temelini oluştururlar. Amaçları bulundukları komitelerde fikir üreterek çözüm taslağına katkıda bulunmaktır. Bu sayede komitelerinin genel kurulda geçmesine yardımcı olurlar. Çözüm Taslağını oluştururken komite divanının bizzat hazırladığı çalışma rehberlerinden faydalanırlar." },
    { disabled: true, name: 'Gözlemci', oName: 'gozlemci', description: "Gözlemciler konferansın gizli kahramanlarıdır. Yerine getirdikleri görevlerle komitelerin düzeninin sağlanmasına yardımcı olurlar." },
    { disabled: true, name: "Basın", oName: "basin", description: "Basın, kişisel kameralarıyla çektikleri konferansa dair fotoğraflarıyla birlikte konferansın kalıcılığına yardımcı olurlar. Basın; komitelerde, aralarda, açılış ve kapanış konuşlarında çektiği fotoğraflarla konferansın işleyişine ışık tutarlar." }
]

const formSorulari = {
    delege: [
        {label: "İsim Soyisim", name: "name", type:"text"},
        {label: "Okul", name: "school", type:"text"},
        {label: "Sınıf", name: "grade"},
        {label: "Telefon Numarası", name: "phone", type:"text"},
        {label: "3 adet komite seçiniz", name: "komiteler"},
        {label: "Tecrübeleriniz", name: "tecrube", type: "textarea"}
    ],
    gozlemci: [
        {label: "İsim Soyisim", name: "name", type:"text"},
        {label: "Okul", name: "school", type:"text"},
        {label: "Sınıf", name: "grade", type:"text"},
        {label: "Telefon Numarası", name: "phone", type:"text"},
        {label: "Tecrübeleriniz", name: "tecrube", type: "textarea"}
    ],
    basin: [
        {label: "İsim Soyisim", name: "name", type:"text"},
        {label: "Okul", name: "school", type:"text"},
        {label: "Sınıf", name: "grade", type:"text"},
        {label: "Telefon Numarası", name: "phone", type:"text"},
        {label: "Tecrübeleriniz", name: "tecrube", type: "textarea"}
    ],
    komitedivani: [
        {label: "İsim Soyisim", name: "name", type:"text"},
        {label: "Okul", name: "school", type:"text"},
        {label: "Sınıf", name: "grade", type:"text"},
        {label: "Telefon Numarası", name: "phone", type:"text"},
        {label: "3 adet komite seçiniz", name: "komiteler"},
        {label: "Tecrübeleriniz", name: "tecrube", type: "textarea"},
        {label: "Komite eş başkanınız ile fikir ayrılığına düşmektesiniz ve bu durum tartışmaya dönüşmekte ne yaparsınız?", name: "ayrilik", type: "textarea"},
        {label: "Kriz durumlarında (çalışmaların yolunda gitmemesi, zamanla ilgili sorun yaşama, grup içi etkileşimin sağlıksız yürümesi vb.) nasıl davranırsınız?", name: "sorun", type: "textarea"},
        {label: "Neden sizi seçmeliyiz?", name: "neden", type: "text"}
    ]
}

const komiteler = [
    "Sağlık",
    "Eğitim",
    "İnsan Hakları",
    "Ekonomi",
    "Çevre",
    "Kriz"
]

const MainContext = createContext({})

const MainContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);
    const [option, setOption] = useState("");
    const [durum, setDurum] = useState(null);
    const [canReApply, setCanReApply] = useState(false);
    const [admin, setAdmin] = useState(false);

    const values = {
        user, setUser,
        authLoading, setAuthLoading,
        isApplied, setIsApplied,
        option, setOption,
        durum, setDurum,
        canReApply, setCanReApply,
        secenekler,
        formSorulari,
        komiteler,
        admin, setAdmin
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