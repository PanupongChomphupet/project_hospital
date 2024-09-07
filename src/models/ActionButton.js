import { useEffect, useState } from "react"
import '../css/ActionButton.css'
import axios from "axios";
import Swal from 'sweetalert2';

export default function ActionButton({ itemId }) {

    const [isOpen, setisOpen] = useState(false)

    const [formdata, setformdata] = useState({
        equipment_number: "",
        equipment_id: "",
        equipment_name: "",
        manufacturer: "",
        model: "",
        serial_number: "",
        department: "",
        rist: "",
        cal: 0,
        pm: 0,
        note: "",
        tester: "",
        result: ""
    });

    const openModel = () => {
        setisOpen(true)

        let url = 'http://localhost:8080/api/edit'
        if (itemId) {
            url += `?filter=${itemId}`
        }
        axios.get(url)
            .then(res => {
                const data = res.data
                setformdata({
                    equipment_number: data['เลขครุภัณฑ์'] || '',
                    equipment_id: data['Equipment ID'] || '',
                    equipment_name: data['Equipment Name'] || '',
                    manufacturer: data['Manufacturer'] || '',
                    model: data['Model'] || '',
                    serial_number: data['Serial Number'] || '',
                    department: data['Department'] || '',
                    rist: data['Rist'] || '',
                    cal: data['CAL'] || false,
                    pm: data['PM'] || false,
                    note: data['Remarks'] || '',
                    tester: data['Tester'] || ''
                })
            }).catch(error => {
                console.log(error.response)
            })


    };

    const closeModel = () => {
        setisOpen(false);
    }

    const outSideClik = (e) => {
        if (e.target.className === "model-edit-data") {
            closeModel();
        }
    }

    const onChangeform = (e) => {
        const { name, value, type, checked } = e.target;
        setformdata(prevFormdata => ({
            ...prevFormdata,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8080/api/updatedata', formdata, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            Swal.fire({
                title: "แก้ไขข้อมูลสำเร็จ!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                closeModel();
                window.location.reload()
            })
        }).catch(error => {
            if (error.response) {
                Swal.fire({
                    icon: "error",
                    title: `${error.response.data.error}`
                })
            }
        })
    }

    const deletedata = () => {

        Swal.fire({
            title: "คุณแน่ใจเหรอ",
            text: "คุณจะไม่สามารถเปลี่ยนกลับสิ่งนี้ได้",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
            reverseButtons: "true"
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/deletedata/${itemId}`)
                    .then((res) => {
                        if (res.data) {
                            Swal.fire("ลบข้อมูลสำเร็จ", "", "success")
                        }
                        window.location.reload()
                    }).catch(error => {
                        
                    })
            }
        })
    }
    return (
        <>
            <div className="action">
                <div className="action-btn">
                    <button onClick={openModel}>แก้ใขข้อมูล</button>
                    <button onClick={deletedata}>ลบข้อมูล</button>
                </div>

                {isOpen && (
                    <div className="model-edit-data" onClick={outSideClik}>
                        <div className="model-content">
                            <div className="head-content">
                                <h2>แก้ใขข้อมูล</h2>
                                <span className="close" onClick={closeModel}>&times;</span>
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className="form-datas">
                                    <div className="form-input">
                                        <label htmlFor="equipment_number">เลขครุภัณฑ์</label><br />
                                        <input
                                            type="text"
                                            name="equipment_number"
                                            value={formdata.equipment_number}
                                            onChange={onChangeform}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="equipment_id">ตัวย่อรหัสเครื่อง</label><br />
                                        <input
                                            type="text"
                                            name="equipment_id"
                                            value={formdata.equipment_id}
                                            onChange={onChangeform}
                                            required
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="equipment_name">ชื่อเครื่อง</label><br />
                                        <input
                                            type="text"
                                            name="equipment_name"
                                            value={formdata.equipment_name}
                                            onChange={onChangeform}
                                            required
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="manufacturer">ยี้ห้อ</label><br />
                                        <input
                                            type="text"
                                            name="manufacturer"
                                            value={formdata.manufacturer}
                                            onChange={onChangeform}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="model">รุ่น</label><br />
                                        <input
                                            type="text"
                                            name="model"
                                            value={formdata.model}
                                            onChange={onChangeform}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label htmlFor="serial_number">หมายเลขซีเรียล</label><br />
                                        <input
                                            type="text"
                                            name="serial_number"
                                            value={formdata.serial_number}
                                            onChange={onChangeform}
                                        />
                                    </div>
                                    <div className="form-checkbox">
                                        <label htmlFor="cal-pm">การสอบเทียบ</label><br />
                                        <input
                                            className="check-pm-cal"
                                            type="checkbox"
                                            name="pm"
                                            checked={formdata.cal}
                                            onChange={onChangeform}
                                        />
                                        <span>CAL</span>
                                        <input
                                            className="check-pm-cal"
                                            type="checkbox"
                                            name="pm"
                                            checked={formdata.pm}
                                            onChange={onChangeform}
                                        />
                                        <span>PM</span>
                                    </div>

                                    <div className="form-select">
                                        <label htmlFor="department">แผนก</label><br />
                                        <select name="department" value={formdata.department} onChange={onChangeform}>
                                            <option value="">-- แผนก --</option>
                                            <option value="OPD">OPD</option>
                                            <option value="ER">ER</option>
                                            <option value="IPD">IPD</option>
                                            <option value="PHA">PHA</option>
                                        </select>
                                    </div>
                                    <div className="form-select">
                                        <label htmlFor="rist">ระดับความเสี่ยง</label><br />
                                        <select name="rist" value={formdata.rist} onChange={onChangeform}>
                                            <option value="">-- ระดับความเสี่ยง --</option>
                                            <option value="LOW">LOW</option>
                                            <option value="MEDIUM">MEDIUM</option>
                                            <option value="HIGH">HIGH</option>
                                        </select>
                                    </div>
                                    <div className="form-select">
                                        <label htmlFor="tester">ผุ้ทดสอบ</label><br />
                                        <select name="tester" value={formdata.tester} onChange={onChangeform}>
                                            <option value="">-- ผู้ทดสอบ --</option>
                                            <option value="CHAIWUT CHOMPUPET">CHAIWUT CHOMPUPET</option>
                                            <option value="PANUPONG CHOMPHUPET">PANUPONG CHOMPHUPET</option>
                                            <option value="THANAKRIT CHOMPHPET">THANAKRIT CHOMPHPET</option>
                                        </select>
                                    </div>

                                    <div className="form-textarea">
                                        <label htmlFor="note">หมายเหตุ</label><br />
                                        <textarea
                                            rows={2}
                                            type="text"
                                            name="note"
                                            value={formdata.note}
                                            onChange={onChangeform}
                                        />
                                    </div>
                                </div>
                                <div className="btn-save-cancel">
                                    <button className="btn" type='button' onClick={closeModel}>ยกเลิก</button>
                                    <button className="btn" type='submit'>บันทึก</button>
                                </div>
                            </form>

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}