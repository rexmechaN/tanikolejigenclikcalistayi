const Basvuru = () => {

    const secenekler = [
        { name: 'Delege', oName: 'delege' },
        { name: 'Gözlemci', oName: 'gozlemci' },
        { name: "Basın", oName: "basin" }
    ]

    return (
        <section className="basvuru">
            <div className="basvuru-secenekler">
                {secenekler.map(secenek => (
                    <div className="basvuru-secenek" key={secenek.name}>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Basvuru;
