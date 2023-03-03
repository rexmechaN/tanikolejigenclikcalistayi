const { firestore } = require("firebase-functions")
const admin = require("firebase-admin")

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = admin.initializeApp(firebaseConfig)

exports.listenChanges = firestore
    .document('applications/{id}')
    .onUpdate((change, context) => {
        const previousData = change.before.data()
        const newData = change.after.data()

        if(!newData) return

        const { durum, option, name, odeme, komite, email } = newData
        const { prevDurum, prevOdeme } = previousData

        let html

        if(durum !== prevDurum) {
            if(durum === 'kabul')
                html = `
                <h3>Sayın ${name},</h3>
                <p>Tanı Koleji Gençlik Çalıştayı'na olan ilginiz için teşekkür ederiz.</p>
                <p>Başvurunuzun ekibimiz tarafından değerlendirilip <b>onaylandığını</b> bildirmekten memnuniyet duyarız.</p>
                <p>Rolünüz: <b>${option}</b></p>
                <p>${option !== "Delege" ? "1 Mart Çarşamba" : "12 Mart Pazar"} gününe kadar katılım ücreti olarak banka hesabımıza ${option !== "Delege" ? "200 TL" : "250 TL"} ödemeniz ve dekontu xxx mail adresimize göndermeniz önemle rica olunur.</p>
                <div>Aksi takdirde başvurunuz ekibimiz tarafından reddedilecektir.</div>
                <p><b>Ödeme Bilgileri:</b></p>
                <div>Ücret: ${option !== "Delege" ? "200 TL" : "250 TL"}</div>
                <div>Açıklama: TANIGC-${name}</div>
                <div>IBAN: XXXX</div>
                <div>Hesap Sahibi: XXXXX</div>
                <br>
                <div><b>Lütfen açıklamaya TANIGC-${name} yazınız ve ödeme sonrasında dekontunuzu xxx adresine gönderiniz. ${option === "Delege" ? "Komiteniz ödemeniz yapıldıktan sonra belirlenecektir." : ""}</b></div>
                <br>
                <div>Zamanında gönderilmeyen ya da dekontsuz ödemeler başvurunuzun reddedilmesine neden olabilir. Ödemenizi ve dekontunuzu en kısa süre göndermenizi öneriyoruz.</div>
                <br>
                <div>TEKNOLOJİ EKİP LİDERİ</div>
                <div>Cem Baykara</div>
                `
            else if (durum === 'ret')
                html = `
                <h3>Sayın ${name},</h3>
                <p>Tanı Koleji Gençlik Çalıştayı'na olan ilginiz için teşekkür ederiz.</p>
                <p>${option} başvurunuzun ekibimiz tarafından değerlendirilip <b>reddedildiğini</b> bildirmekten hüzün duyuyoruz.</p>
                <p>Başka çalıştaylarda görüşmek dileğiyle...</p>
                ${option!=="Delege" && `<p>Dilerseniz sitemiz üzerinden delege olarak tekrar başvuru yapabilirsiniz.</p>`}
                <div>TEKNOLOJİ EKİP LİDERİ</div>
                <div>Cem Baykara</div>
                `
            else return
        }
        else if(odeme !== prevOdeme && odeme)
            html = `
            <h3>Sayın ${name},</h3>
            <p>Tanı Koleji Gençlik Çalıştayı ödemeniz onaylanmıştır !</p>
            <p>Rolünüz: <b>${option}</b></p>
            ${(option==="Delege" || option==="Komite Başkan Vekili") ? `<p>Komiteniz: <b>${komite}</b></p>` : ""}
            <p>Konferansımızda görüşmek üzere...</p>
            <div>TEKNOLOJİ EKİP LİDERİ</div>
            <div>Cem Baykara</div>
            `
        else return

        admin.firestore(app).collection("mail").add({
            to: email,
            message: {
                subject: "TANIGÇ'23 Başvuru Durumu",
                html
            }
        })
    })