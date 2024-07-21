const router = require("express").Router();
const packageController = require("../src/Package/packageController");


router.get("/", packageController.findAll);

router.post("/", packageController.create);

router.put("/:id", packageController.update);

router.get("/:id", packageController.findById);

router.delete("/:id", packageController.delete);


module.exports = router;