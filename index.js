import express from 'express';
const app = express();

import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from 'url';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

app.engine('handlebars', handlebars.engine({
    defaultLayout: '...',
    handlebars: allowInsecurePrototypeAccess(Handlebars),

}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('!!!')
})

app.listen(3000, () => console.log('Servidor Rodando em http://localhost:3000'))