import { useState } from 'react'
import '../css/model-popup-add.css'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddModelPopup() {
    const [isOpen, setisOpen] = useState(false);
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
    const [errorMessages, setErrorMessages] = useState({});

    // function Open-Closs Popup 
    const openModel = () => {
        setisOpen(true);
    };

    const closeModel = () => {
        setisOpen(false);
    };

    const outSideClik = (e) => {
        if (e.target.className === "model-add-data") {
            closeModel();
        }
    };

    // onsibmit formdata 
    const onChangeform = (e) => {
        const { name, value, type, checked } = e.target

        setformdata(prevFormdata => ({
            ...prevFormdata,
            [name]: type === "checkbox" ? checked : value
        }));

    }

    const onSubmit = (e) => {
        e.preventDefault(); // ไม่ให้หน้า refresh

        axios.post("http://localhost:8080/api/add-device", formdata, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            Swal.fire({
                title: "บันทึกข้อมูลสำเร็จ!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setErrorMessages({});
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
    return (
        <>
            <div className="add-data-btn">
                <button onClick={openModel}>เพิ่มเครื่องมือ</button>
            </div>
            {isOpen && (
                <div className="model-add-data" onClick={outSideClik}>
                    <div className="model-content">
                        <div className="head-content">
                            <h2>เพิ่มข้อมูล</h2>
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
                                        className={errorMessages.equipment_id ? 'input-error' : ''}
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
                                        type="checkbox"
                                        name="cal"
                                        checked={formdata.cal}
                                        onChange={onChangeform}
                                    />
                                    <span>CAL</span>
                                    <input
                                        type="checkbox"
                                        name="pm"
                                        checked={formdata.pm}
                                        onChange={onChangeform}
                                    />
                                    <span>PM</span>
                                </div>

                                <div className="form-select">
                                    <label htmlFor="department">แผนก</label><br />
                                    <select name="department" value={formdata.department} onChange={onChangeform} >
                                        <option value="">-- แผนก --</option>
                                        <option value="OPD">OPD</option>
                                        <option value="ER">ER</option>
                                        <option value="IPD">IPD</option>
                                        <option value="PHA">PHA</option>
                                    </select>
                                </div>
                                <div className="form-select">
                                    <label htmlFor="rist">ระดับความเสี่ยง</label><br />
                                    <select name="rist" value={formdata.rist} onChange={onChangeform} >
                                        <option value="">-- ระดับความเสี่ยง --</option>
                                        <option value="LOW">LOW</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HIGH">HIGH</option>
                                    </select>
                                </div>
                                <div className="form-select">
                                    <label htmlFor="tester">ผุ้ทดสอบ</label><br />
                                    <select name="tester" value={formdata.tester} onChange={onChangeform} >
                                        <option value="">-- ผู้ทดสอบ --</option>
                                        <option value="CHAIWUT CHOMPUPET">CHAIWUT CHOMPUPET</option>
                                        <option value="PANUPONG CHOMPHUPET">PANUPONG CHOMPHUPET</option>
                                        <option value="THANAKRIT CHOMPHPET">THANAKRIT CHOMPHPET</option>
                                    </select>
                                </div>

                                <div className="form-textarea">
                                    <label htmlFor="note">หมายเหตุ</label><br />
                                    <textarea rows={2}
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
                </div >
            )
            }

        </>
    )
}