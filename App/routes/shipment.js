const express = require("express");
const {
    createShipment,
    editShipment,
    deleteShipment,
    viewShipment,
    viewShipments,
    updateShipmentHistory} = require("../controllers/shipment");
const {viewUsers} = require("../controllers/user");
const router = express.Router();

router.post("/create-shipment", createShipment);
router.put("/edit_shipment/:id", editShipment);
router.post("/update_shipment", updateShipmentHistory);
router.delete("/delete_shipment/:id", deleteShipment);
router.get("/view_shipment/:id", viewShipment);
router.get("/view_shipments", viewShipments);
router.get("/view-users", viewUsers);

module.exports = router;