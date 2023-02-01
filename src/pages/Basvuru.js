import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

const Basvuru = () => {

    const secenekler = [
        { name: 'Delege', oName: 'delege', description: "Delegeler konferansın temelini oluştururlar. Amaçları bulundukları komitelerde fikir üreterek çözüm taslağına katkıda bulunmaktır. Bu sayede komitelerinin genel kurulda geçmesine yardımcı olurlar. Çözüm Taslağını oluştururken komite divanının bizzat hazırladığı çalışma rehberlerinden faydalanırlar." },
        //{ name: 'Gözlemci', oName: 'gozlemci', description: "Gözlemciler konferansın gizli kahramanlarıdır. Yerine getirdikleri görevlerle komitelerin düzeninin sağlanmasına yardımcı olurlar." },
        { name: "Basın", oName: "basin", description: "Basın, kişisel kameralarıyla çektikleri konferansa dair fotoğraflarıyla birlikte konferansın kalıcılığına yardımcı olurlar. Basın; komitelerde, aralarda, açılış ve kapanış konuşlarında çektiği fotoğraflarla konferansın işleyişine ışık tutarlar." },
        {name: "Komite Başkan Vekili", oName: "komite-baskan-vekili", description: "Komite divanları akademik tecrübeleri olan ve daha önceden delegelik yapmış, komite başkanı ve yardımcısıdır. Divan üyeleri komite çalışma rehberlerini hazırlar ve kendi komitelerindeki delegelerin çözüm tasklakları oluşturmalarına yardımcı olurlar."}
    ]

    const scroll = (direction) => {
        const ele = document.querySelector(".basvuru-secenekler")
        if(direction==="left") {
            console.log("left")
            ele.scrollLeft += -500;
        }
        else if(direction==="right") {
            console.log("right")
            ele.scrollLeft += 500;
        }


    }

    return (
        <section className="basvuru">
            <h1>Başvuru Seçenekleri</h1>
            <div className="basvuru-container">
                <AiOutlineArrowLeft onClick={() => scroll("left")} size={40} className="left-arrow arrow" />
                <div className="basvuru-secenekler">
                    {secenekler.map(secenek => (
                        <div className="basvuru-secenek" key={secenek.name}>
                            <div className="img" style={{background: `url(${require(`../images/${secenek.oName}.webp`)}) center center/cover`}}></div>
                            <div className="basvuru-secenek-content">
                                <h2 className="basvuru-secenek-name">{secenek.name}</h2>
                                <p className="basvuru-secenek-desc">{secenek.description}</p>
                                <button className="basvuru-secenek-popup">Ne yapar?</button>
                                <button className="button">Devam et</button>
                            </div>
                        </div>
                    ))}
                </div>
                <AiOutlineArrowRight onClick={() => scroll("right")} className="right-arrow arrow" size={40} />
            </div>
        </section>
    );
};

export default Basvuru;
