const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cart-manager.js");
const cartManager = new CartManager("./src/models/cart.json");

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito)
    } catch (error) {
        res.json({error: "error al crear"})
    }
} )

router.get("/:cid", async (req, res) => {

    const cartId = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCarritoById(cartId);
        res.json(carrito.products)
    } catch (error) {
        res.json({error: "error al cargar"})
    }
} )

router.post("/:cid/product/:pid", async (req, res) => {
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1
    const cartId = parseInt(req.params.cid);

    try {
        const actualizaCarrito = await cartManager.agregarProductosAlCarrito(cartId, quantity, productId);
        res.json(actualizaCarrito.products)
    } catch (error) {
        res.json({error: "error al actualuizar"})
    }
} )

module.exports = router;    