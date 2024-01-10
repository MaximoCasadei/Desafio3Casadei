const express = require("express");
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const app = express();

// middlewars
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PUERTO, ()=>{
    console.log("Escuchando en el puerto 8080");
})