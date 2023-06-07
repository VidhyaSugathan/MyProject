import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "project"
})

app.get('/', (req, res) => {
    const sql = "Select * from products";
    db.query(sql, (err, result) => {
        if (err) res.send(err);
        return res.send(result);
    })
})

// app.post('/addproduct',  (req, res) => {
//     const { Title, CompanyName, Price, Image } = req.body;
//     // const imageBuffer = Buffer.from(Image, 'base64');
//     const sql = "insert into products (Title,CompanyName,Price,Image) values(?,?,?,?);";
//     const values = [Title, CompanyName, Price, imageBuffer];
//     db.query(sql, values, (err, result) => {
//         if (err) res.send(err, sql);
//         return res.send(result);
//       });
//     });
app.post('/addproduct', (req, res) => {
    const { Title, CompanyName, Price, Image } = req.body;
    const sql =  "insert into products (Title,CompanyName,Price,Image) values('"+Title+"','"+CompanyName+"','"+Price+"','"+Image+"');";;
    db.query(sql, (err, result) => {
        if (err) res.send(err, sql);
        return res.send(result);
    })
})
app.post('/delete', (req, res) => {
    const Id = req.body.id;
    const sql = "delete from products where Id= '" + Id + "';";
    db.query(sql, (err, result) => {
        if (err) res.send(err, sql);
        return res.send(result);
    })
})
app.listen(8080, () => {
    console.log("Listening")
})
