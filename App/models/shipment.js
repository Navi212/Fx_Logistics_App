const mongoose = require("mongoose");

const ShipmentSchema = mongoose.Schema({
    firstName: String, 
    lastName: String,
    countryOrigin: String,
    countryDest: String, 
    trackingNum: Number,
    history: [
        {
          location: String,
          status: String,
          timestamps: { type: Date, default: Date.now },
        },
      ],
},
{ timeStamps: true });

const Shipment = mongoose.model("Shipment", ShipmentSchema);
module.exports = Shipment;