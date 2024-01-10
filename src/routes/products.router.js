const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");


// Rutas



router.get("/products", async(req, res)=>{
    try {
        const arrayProductos = await productManager.leerArchivo();

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

router.get("/products/:pid", async(req, res)=>{
    try {
        let pid = parseInt(req.params.pid)

        const buscado = await productManager.getPoductsById(pid)

        if(buscado){
            return res.send(buscado);
        }else{
            return res.send("ID no existente");
        }

    } catch (error) {
        return error;
    }
})


module.exports = router;