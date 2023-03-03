
const PanelNavbar = ({active, setActive, secenekler}) => {

    return (
        <div className="panel-nav-container">
            <div className="panel-nav">
                {secenekler.map(secenek => (
                    <div key={secenek.name} onClick={() => setActive(secenek.name)} className={active === secenek.name ? "panel-nav-item panel-active-item" : "panel-nav-item"}>
                        {secenek.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PanelNavbar;
