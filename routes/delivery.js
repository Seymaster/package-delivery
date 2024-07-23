const router = require("express").Router();
const deliveryController = require("../src/delivery/deliveryController");


router.get("/", deliveryController.findAll);

router.post("/", deliveryController.create);

router.put("/:id", deliveryController.update);

router.get("/:id", deliveryController.findById);

router.delete("/:id", deliveryController.delete);


module.exports = router;