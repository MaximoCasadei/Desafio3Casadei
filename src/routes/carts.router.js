const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cart-manager.js");
const cartManager = new CartManager("./src/models/cart.json");

router.post("/carts", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito)
    } catch (error) {
        console.error("Error en crear carrito")
        res.status(500).json({error: "error interno del server"})
    }
} )

router.get("/carts/:cid", async (req, res) => {

    const cartId = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCarritoById(cartId);
        res.json(carrito.products)
    } catch (error) {
        console.error("error")
        res.status(500).json({ error: "error interno" })
    }
} )

router.post("/carts/:cid/product/:pid", async (req, res) => {
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1
    const cartId = parseInt(req.params.cid);

    try {
        const actualizaCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId , quantity);
        res.json(actualizaCarrito.products)
    } catch (error) {
        console.error ("error al agregar" )
        res.status(500).json({ error:"Error interno" })
    }
} )

module.exports = router;    