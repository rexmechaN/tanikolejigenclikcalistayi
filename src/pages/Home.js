import {useLayoutEffect, useState} from "react";

const Home = () => {

    const [date, setDate] = useState([])

    useLayoutEffect(() => {
        const countDownDate = new Date("April 28, 2023 00:00:00").getTime()
        const root = document.querySelector(":root")

        const now = new Date().getTime()

        const distance = countDownDate - now

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(!(days < 0 || hours < 0 || minutes < 0 || seconds < 0))
            setDate([days, hours, minutes, seconds])
        else
            setDate([0, 0, 0, 0])

        const interval = setInterval(() => {
            const now = new Date().getTime()

            const distance = countDownDate - now

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(!(days < 0 || hours < 0 || minutes < 0 || seconds < 0))
                setDate([days, hours, minutes, seconds])
            else
                setDate([0, 0, 0, 0])

        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <section className="home">
            <div style={{height:"70vh" ,background: `url(${require("../images/ial.webp")}) center center/cover`}} className="hero">
                <div className="hero-content">
                    <h1>#TANIGÇ'23</h1>
                    <h2>Tanı Koleji Gençlik Çalıştayı</h2>
                </div>
            </div>
            <div className="countdown">
                <h3>Kalan Süre:</h3>
                <div className="timer">
                    <div>
                        <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6993 23.7106L11.3995 22.0913C6.23228 29.4168 3.19727 38.354 3.19727 48C3.19727 50.7761 3.44865 53.4936 3.92991 56.1307L6.69662 55.6226C6.24544 53.1502 6.00977 50.6026 6.00977 48C6.00977 38.9569 8.85509 30.5783 13.6993 23.7106Z" fill="#CD374C"/>
                            <path d="M22.6004 85.1517C29.8291 90.1033 38.5763 93 48 93C72.8528 93 93 72.8528 93 48C93 23.1472 72.8528 3 48 3C39.1503 3 30.8972 5.55459 23.938 9.96658L25.4419 12.3437C31.9662 8.20743 39.7034 5.8125 48 5.8125C71.2995 5.8125 90.1875 24.7005 90.1875 48C90.1875 71.2995 71.2995 90.1875 48 90.1875C39.1653 90.1875 30.9648 87.4718 24.1879 82.8297L22.6004 85.1517Z" fill="#CD374C"/>
                            <text x="50%" y="38%" textAnchor="middle" dy=".3em">{date[0]}</text>
                            <text x="50%" y="62%" textAnchor="middle" dy=".3em">Gün</text>
                        </svg>
                        <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6993 23.7106L11.3995 22.0913C6.23228 29.4168 3.19727 38.354 3.19727 48C3.19727 50.7761 3.44865 53.4936 3.92991 56.1307L6.69662 55.6226C6.24544 53.1502 6.00977 50.6026 6.00977 48C6.00977 38.9569 8.85509 30.5783 13.6993 23.7106Z" fill="#CD374C"/>
                            <path d="M22.6004 85.1517C29.8291 90.1033 38.5763 93 48 93C72.8528 93 93 72.8528 93 48C93 23.1472 72.8528 3 48 3C39.1503 3 30.8972 5.55459 23.938 9.96658L25.4419 12.3437C31.9662 8.20743 39.7034 5.8125 48 5.8125C71.2995 5.8125 90.1875 24.7005 90.1875 48C90.1875 71.2995 71.2995 90.1875 48 90.1875C39.1653 90.1875 30.9648 87.4718 24.1879 82.8297L22.6004 85.1517Z" fill="#CD374C"/>
                            <text x="50%" y="38%" textAnchor="middle" dy=".3em">{date[1]}</text>
                            <text x="50%" y="62%" textAnchor="middle" dy=".3em">Saat</text>
                        </svg>
                    </div>
                    <div>
                        <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6993 23.7106L11.3995 22.0913C6.23228 29.4168 3.19727 38.354 3.19727 48C3.19727 50.7761 3.44865 53.4936 3.92991 56.1307L6.69662 55.6226C6.24544 53.1502 6.00977 50.6026 6.00977 48C6.00977 38.9569 8.85509 30.5783 13.6993 23.7106Z" fill="#CD374C"/>
                            <path d="M22.6004 85.1517C29.8291 90.1033 38.5763 93 48 93C72.8528 93 93 72.8528 93 48C93 23.1472 72.8528 3 48 3C39.1503 3 30.8972 5.55459 23.938 9.96658L25.4419 12.3437C31.9662 8.20743 39.7034 5.8125 48 5.8125C71.2995 5.8125 90.1875 24.7005 90.1875 48C90.1875 71.2995 71.2995 90.1875 48 90.1875C39.1653 90.1875 30.9648 87.4718 24.1879 82.8297L22.6004 85.1517Z" fill="#CD374C"/>
                            <text x="50%" y="38%" textAnchor="middle" dy=".3em">{date[2]}</text>
                            <text x="50%" y="62%" textAnchor="middle" dy=".3em">Dakika</text>
                        </svg>
                        <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6993 23.7106L11.3995 22.0913C6.23228 29.4168 3.19727 38.354 3.19727 48C3.19727 50.7761 3.44865 53.4936 3.92991 56.1307L6.69662 55.6226C6.24544 53.1502 6.00977 50.6026 6.00977 48C6.00977 38.9569 8.85509 30.5783 13.6993 23.7106Z" fill="#CD374C"/>
                            <path d="M22.6004 85.1517C29.8291 90.1033 38.5763 93 48 93C72.8528 93 93 72.8528 93 48C93 23.1472 72.8528 3 48 3C39.1503 3 30.8972 5.55459 23.938 9.96658L25.4419 12.3437C31.9662 8.20743 39.7034 5.8125 48 5.8125C71.2995 5.8125 90.1875 24.7005 90.1875 48C90.1875 71.2995 71.2995 90.1875 48 90.1875C39.1653 90.1875 30.9648 87.4718 24.1879 82.8297L22.6004 85.1517Z" fill="#CD374C"/>
                            <text x="50%" y="38%" textAnchor="middle" dy=".3em">{date[3]}</text>
                            <text x="50%" y="62%" textAnchor="middle" dy=".3em">Saniye</text>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
