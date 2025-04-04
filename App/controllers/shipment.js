const Shipment = require("../models/shipment");

const createShipment = async(req, res) => {
    const { firstName, lastName, countryOrigin, countryDest, status, trackingNum } = req.body;
    
    if (!firstName || !lastName || !countryOrigin || !countryDest || !status || !trackingNum) {
        req.flash("error", "All fields are required!");
        return res.render("pages/dashboard",  { messages: req.flash() });
    }
    else {
    try {
        const existsShipment = await Shipment.findOne({trackingNum});
        if (existsShipment) {
            req.flash("error", "Tracking number already exists!");
            return res.render("pages/dashboard",  { messages: req.flash() });
        }
        const shipment = await Shipment.create({
            firstName,
            lastName, 
            countryOrigin, 
            countryDest, 
            status, 
            trackingNum}, { new: true });
        req.flash("success", "Shipment created!");
        return res.render("pages/dashboard",  { messages: req.flash() });
    } catch (error) {
        req.flash("error", "Server error occured creating shipment!");
        return res.render("pages/dashboard",  { messages: req.flash() });
    }
}
}

const editShipment = async(req, res) => {
    const { firstName, lastName, countryOrigin, countryDest, status, trackingNum } = req.body;
    const { id } = req.params;

    try {
        const updatedShipment = await Shipment.findByIdAndUpdate(id, {
            firstName,
            lastName,
            countryOrigin,
            countryDest,
            status,
            trackingNum}, 
            {new: true});
        return res.status(200).json({success: true, data: updatedShipment});
        } catch (error) {
        return res.status(500).json({success: false, msg: "Error occured updating shipment"});        
    }
}

const deleteShipment = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedShipment = await Shipment.findByIdAndDelete(id);
        if (!deletedShipment) {
            return res.status(400).json({success: false, msg: "Shipment not found and could'nt be deleted"});
        }
        return res.status(204).json({success: true, msg: "Shipment deleted"});
        } catch (error) {
        return res.status(500).json({success: false, msg: "Error occured deleting shipment"});        
    }
}

const viewShipment = async(req, res) => {
    const { id } = req.params;

    try {
        const shipment = await Shipment.findById(id);
        if (!shipment)
            return res.status(200).json({success: true, msg: "No shipment found"});
        return res.status(200).json({success: true, data: shipment});
        } catch (error) {
        return res.status(500).json({success: false, msg: "Error occured viewing shipment"});        
    }
}

const viewShipments = async(req, res) => {
    try {
        const shipment = await Shipment.find();
        if (!shipment)
            return res.status(200).json({success: true, msg: "No shipment found"});
        return res.status(200).json({success: true, data: shipment});
        } catch (error) {
        return res.status(500).json({success: false, msg: "Error occured viewing shipment"});        
    }
}

const updateShipmentHistory = async (req, res) => {
    const { location, status } = req.body;
    const { trackingNum } = req.query;

    try {
        const shipment = await Shipment.findOne({trackingNum});
        if (!shipment) {
            req.flash("error", "Tracking number does not exist!");
            return res.redirect("pages/dashboard");
            // return res.render("pages/dashboard",  { messages: req.flash() });
        }
        shipment.history.push({location, status});
        // Update the overall status if needed
        shipment.status = status;
        
        await shipment.save();

        req.flash("success", "Shipment updated successfully.");
        return res.redirect("pages/dashboard"); // Adjust based on your frontend
    } catch (error) {
        req.flash("error", "Something went wrong.");
        res.redirect("pages/dashboard");
    }
}

module.exports = {
    createShipment,
    editShipment,
    deleteShipment,
    viewShipment,
    viewShipments,
    updateShipmentHistory,
    updateShipmentHistory,
}