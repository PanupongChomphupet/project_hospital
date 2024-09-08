import Navbar from '../components/Navbar'
import Header from '../components/Header'
import '../css/MedicalDevice.css'
import Table from '../components/Table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddModelPopup from '../models/model_popup_add'
import Select from 'react-select'


export default function MedicalDevice() {
    const [device, setdevice] = useState([])
    const [selectedOption, setselectOption] = useState(null)

    useEffect(() => {
        getDataDevice()
    }, [selectedOption])

    const getDataDevice = () => {
        let url = "http://localhost:8080/api/table"
        if (selectedOption) {
            url += `?filter=${selectedOption.value}`;
        }
        axios.get(url)
            .then((result) => {
                const data = result.data
                data.sort((a, b) => {
                    return a["Department"].toLowerCase().localeCompare(b["Department"].toLowerCase()) ||
                        a["Equipment ID"].toLowerCase().localeCompare(b["Equipment ID"].toLowerCase())
                })
                setdevice(data);
            })
            .catch((err) => {
                console.log('err', err);
            });
    };
    const handleSelectCgange = (selectedOption) => {
        setselectOption(selectedOption)
    }

    return (
        <>
            <Header />
            <Navbar />
            <div className="display-flex">
                <div className="medical-device">
                    <div className="head-content">
                        <h2 className="title">โรงพยาบาลขอนแก่น อ. เมือง จ. ขอนแก่น</h2>
                    </div>
                    <div className="add-information">
                        <AddModelPopup />
                    </div>
                    <Table data={device} />
                </div>
            </div>
        </>
    )
}