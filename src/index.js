import express from "express";
import MensajesDao from "./dao/MensajesDao.js";
import { faker } from "@faker-js/faker";
import { normalize, schema, denormalize } from "normalizr";
import util from "util";
import blog from "./blog.js";
import fs from "fs";

const MensajesApi = new MensajesDao("./DB/mensajes.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MessagesRouter = express.Router();
const ProductRouter = express.Router();

app.use("/api/mensajes", MessagesRouter);
app.use("/api/productos-test", ProductRouter);

// --------- Schema de mensajes ----------

// Definimos un esquema de autores
const author = new schema.Entity("author");

// Definimos un esquema de mensaje
const text = new schema.Entity("text");

// Definimos un esquema de mensaje con autor
const mensajes = new schema.Entity("mensajes", {
  author: author,
  text: text,
});

// Definimos un esquema de chat
const chat = new schema.Entity("chat", {
  chat: [mensajes],
});

// --------- Schema de blog -----------

// Se usa el mismo author que en los mensajes

// Definimos un esquema de comentadores
const comment = new schema.Entity("comments", {
  commenter: author,
});

// Definimos un esquema de artículos
const article = new schema.Entity("articles", {
  author: author,
  comments: [comment],
});

// Definimos un esquema de posts (array de artículos)
const posts = new schema.Entity("posts", {
  posts: [article],
});

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

// console.log(' ------------- BLOG ORIGINAL --------------- ')
// print(blog)
// console.log(JSON.stringify(blog).length)

// console.log(' ------------- BLOG NORMALIZADO --------------- ')
const normalizedData = normalize(blog, posts);
// print(normalizedData)
// console.log(JSON.stringify(normalizedData).length)
// fs.writeFileSync('./DB/normalizado.json', JSON.stringify(normalizedData, null, 3));

// console.log(' ------------- BLOG DENORMALIZADO --------------- ')
// const denormalizedData = denormalize(normalizedData.result, posts, normalizedData.entities);
// print(denormalizedData)
// console.log(JSON.stringify(denormalizedData).length)

// console.log(' ------------- MENSAJE ORIGINAL --------------- ')
const MessageDB = fs.readFileSync("./DB/mensajes.json", "utf-8");

console.log(" ------------- MENSAJE NORMALIZADO --------------- ");
const messagesParsed = JSON.parse(MessageDB);

// Agregamos los mensajes a "messages", incluye {author, text}
let messages = [];
for (let index = 0; index < messagesParsed.length; index++) {
  const message = messagesParsed[index];
  messages.push(message);
}
// Luego de agregar los mensajes, agregamos un id al array para normalizr
const messageId = [{ id: "1000", mensajes: messages }];
const messageData = {
  id: "999",
  chat: messageId,
};
console.log(messages);
const normalizedMessageData = normalize(messageData, chat);
// fs.writeFileSync('./DB/mensajesNormalizado.json', JSON.stringify(normalizedMessageData), null, 3);

// console.log(' ------------- MENSAJE DENORMALIZADO --------------- ')
// const denormalizedMsjData = denormalize(normalizedMsjData.result, chat, normalizedMsjData.entities);
// print(denormalizedMsjData)
// console.log(JSON.stringify(denormalizedMsjData).length)

// Generacion de productos con faker
let productos = [];
let id = 0;
const generateProduct = () => {
  return {
    id: id++,
    nombre: faker.name.firstName(),
    precio: faker.random.numeric(),
    foto: faker.internet.avatar(),
  };
};
// ------ productos EndPoints ----------

ProductRouter.get("/", async (req, res) => {
  // Muestra los productos generados con faker
  res.send(productos);
});

ProductRouter.post("/", async (req, res) => {
  // Generador de 5 productos con faker
  const cantidad = 5;
  for (let index = 0; index < cantidad; index++) {
    const product = generateProduct();
    productos.push(product);
  }
  res.send(productos);
});

// ------ Mensajes EndPoints ----------
MessagesRouter.get("/", async (req, res) => {
  // Muestra los mensajes normalizados en un array, con sus autores
  res.send(normalizedMessageData);
});

MessagesRouter.post("/", async (req, res) => {
  // Toma los datos del front-end y guarda un mensaje en ./DB/mensajes.json
  const author = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    alias: req.body.alias,
    avatar: req.body.avatar,
  };
  const message = req.body.text;
  const mesageSave = await MensajesApi.save(message, author);
  res.send(mesageSave);
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`);
});

server.on("error", (err) => console.log(err));
