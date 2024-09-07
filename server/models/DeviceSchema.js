const mongoose = require('mongoose')

const deviceFind = mongoose.Schema({
    "เลขครุภัณฑ์": String,
    "Equipment ID": String,
    "Equipment Name": String,
    "Manufacturer": String,
    "Model": String,
    "Serial Number": String,
    "Department": String,
    "Rist": String,
    "CAL": Boolean,
    "PM": Boolean,
    "Remarks": String,
    "Tester": String
}, { versionKey: false })

const DeviceSchema = mongoose.model('medical_devices', deviceFind)
module.exports = DeviceSchema