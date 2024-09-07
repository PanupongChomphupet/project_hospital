const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const DeviceSchema = require('../models/DeviceSchema')
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json())


const dbUrl = 'mongodb://localhost:27017/hospital_datas'

mongoose.connect(dbUrl).then("conmected success")

app.get('/api/table', (req, res) => {
    const filter = req.query.filter

    if (filter) {
        DeviceSchema.find({ Department: filter }).select('-_id -Items')
            .then(devices => {
                res.json(devices);
            }).catch(error => {
                res.status(500).json({ error: `Error fetching data: ${error}` });
            });
    } else {
        DeviceSchema.find().select('-_id -Items')
            .then(devices => {
                res.json(devices);
            }).catch(error => {
                res.status(500).json({ error: `Error fetching data: ${error}` });
            });
    }
})

app.post('/api/add-device', (req, res) => {
    const data = req.body

    DeviceSchema.findOne({ "Equipment ID": data.equipment_id })
        .then(existingDeive => {
            if (existingDeive) {
                res.status(400).json({ error: "รหัสนี้ถูกใช้งานเล้ว" });
            } else {
                DeviceSchema.findOne()
                    .then(listDevice => {
                        const Device = new DeviceSchema({
                            "เลขครุภัณฑ์": data.equipment_number,
                            "Equipment ID": data.equipment_id,
                            "Equipment Name": data.equipment_name,
                            "Manufacturer": data.manufacturer,
                            "Model": data.model,
                            "Serial Number": data.serial_number,
                            "Department": data.department,
                            "Rist": data.rist,
                            "CAL": data.cal,
                            "PM": data.pm,
                            "Remarks": data.note,
                            "Tester": data.tester,
                        })
                        Device.save()
                            .then(saveDevice => {
                                res.json(saveDevice)
                            }).catch(err => {
                                console.log(err)
                                res.status(400).json({ error: "บันทึกข้อมูลไม่สำเร็จ" })
                            })

                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "err.message" });
                    })
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: "err.message" });
        })
})

app.get('/api/edit', (req, res) => {
    const filter = req.query.filter;
    DeviceSchema.findOne({ "Equipment ID": filter })
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).json({error: "ไม่พบข้อมูล"})
        })
})

app.put('/api/updatedata', (req, res) => {
    const dataToSend = req.body

    const data = {
        'เลขครุภัณฑ์': dataToSend.equipment_number,
        'Equipment ID': dataToSend.equipment_id,
        'Equipment Name': dataToSend.equipment_name,
        'Manufacturer': dataToSend.manufacturer,
        'Model': dataToSend.model,
        'Serial Number': dataToSend.serial_number,
        'Department': dataToSend.department,
        'Rist': dataToSend.rist,
        'CAL': dataToSend.cal,
        'PM': dataToSend.pm,
        'Remarks': dataToSend.note,
        'Tester': dataToSend.tester
    }

    DeviceSchema.findOneAndUpdate({
        "Equipment ID": dataToSend.equipment_id,
    },
        data,
        { new: true, runValidators: true }
    )
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'ไม่พบข้อมูล' });
            }
            res.json(result);
        }).catch(err => {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'An error occurred while updating data' });
        });
})

app.delete('/api/deletedata/:itemId', (req, res) => {
    const equipment_id = req.params.itemId
    
    DeviceSchema.deleteOne({"Equipment ID": equipment_id})
    .then(result => {
        if (!result) {
            res.status(404).json({error: "ไม่พบข้อมูล"})
        }
        res.json(result)
    }).catch (err => {
        console.log(err)
        res.status(500).json({err: "error.messge"})
    })
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
