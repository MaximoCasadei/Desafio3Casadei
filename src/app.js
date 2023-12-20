const ProductManager = require("./product-manager");
const express = require("express");
const PUERTO = 8080;

const manager = new ProductManager("./src/productos.json")


const app = express();

app.get("/products", async(req, res)=>{
    try {
        const arrayProductos = await manager.leerArchivo();

        let limit = parseInt(req.query.limit);

        if(limit){
            const arrayConLimite = arrayProductos.slice(0, limit);
            return res.send(arrayConLimite)
        } else {
            return res.send(arrayProductos);
        }


    } catch (error) {
        console.log(error)
        return res.send("Error in the process")
    }
})

app.get("/products/:pid", async(req, res)=>{
    try {
        let pid = parseInt(req.params.pid)

        const buscado = await manager.getPoductsById(pid)

        if(buscado){
            return res.send(buscado);
        }else{
            return res.send("ID no existente");
        }

    } catch (error) {
        return error;
    }
})

app.listen(PUERTO, ()=>{
    console.log("Escuchando en el puerto 8080");
})