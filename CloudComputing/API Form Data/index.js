const functions = require("firebase-functions");

const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const express = require("express");
const cors = require("cors");
const { application } = require("express");

//main app
const app = express();
app.use(cors({ origin : true}));

// database
const db = admin.firestore();

//routes
app.get("/", (req, res) => {
    return res.status(200).send("Cek")
});

//post methode
app.post("/api/create", (req, res) => {
    (async () => {
        try{
            await db.collection('userDetails').doc(`/${Date.now()}/`).create({
                id : Date.now(),
                namaPemilik : req.body.namaPemilik,
                noWhatsapp : req.body.noWhatsapp,
                jenisHewan : req.body.jenisHewan,
                tanggalKonsul : req.body.tanggalKonsul,
            });

            return res.status(200).send({status : 'Yey bisa', msg: "Data Saved"});
        }
        catch(error){
            console.log(error)
            return res.status(500).send({status : 'Punten Coba Lagi', msg : error});
        }
    })();
});
// get methode
// ambil single data
app.get("/api/get/:id", (req, res) => {
    (async () =>{
        try {
            const reqDoc = db.collection("userDetails").doc(req.params.id);
            let userDetails = await reqDoc.get();
            let response = userDetails.data();

            return res.status(200).send({ status : 'Nih data nya', data : response });
        }
        catch(error){
            console.log(error)
            return res.status(500).send({ status : 'Lo hacker y', msg : error });
        }
    })();
});
// ambil all data
app.get("/api/getAll", (req, res) => {
    (async () =>{
        try {
            const query = db.collection("userDetails");
            let response = [];
            
            await query.get().then((data) => {
                let docs = data.docs;

                docs.map((doc) => {
                    const selectItem = {
                        namaPemilik : doc.data().namaPemilik,
                        noWhatsapp : doc.data().noWhatsapp,
                        jenisHewan : doc.data().jenisHewan,
                        tanggalKonsul : doc.data().tanggalKonsul,
                    };
                    response.push(selectItem);
                }); 
                return response;
            });

            return res.status(200).send({ status : 'Nih data nya', data : response });
        }
        catch(error){
            console.log(error)
            return res.status(500).send({ status : 'Lo hacker y', msg : error });
        }
    })();
});

// update methode
app.put("/api/update/:id", (req, res) => {
    (async () =>{
        try {
            const reqDoc = db.collection("userDetails").doc(req.params.id);
            await reqDoc.update({
                namaPemilik : req.body.namaPemilik,
                noWhatsapp : req.body.noWhatsapp,
                jenisHewan : req.body.jenisHewan,
                tanggalKonsul : req.body.tanggalKonsul,
            });

            return res.status(200).send({ status : 'Ye update', msg : "Data Update" });
        }
        catch(error){
            console.log(error)
            return res.status(500).send({ status : 'Siapa ini ?', msg : error });
        }
    })();
});
// delete methode
app.delete("/api/delete/:id", (req, res) => {
    (async () =>{
        try {
            const reqDoc = db.collection("userDetails").doc(req.params.id);
            await reqDoc.delete();

            return res.status(200).send({ status : 'Dah kehapus', msg : "Data Removed" });
        }
        catch(error){
            console.log(error)
            return res.status(500).send({ status : 'Format Salah', msg : error });
        }
    })();
});
//export data 
exports.app = functions.https.onRequest(app);