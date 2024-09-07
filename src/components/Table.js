import '../css/Table.css'
import ActionButton from '../models/ActionButton'

export default function Table({ data, }) {
    if (!data || data.length === 0) {
        return <p>ไม่มีข้อมูล</p>;
    }

    return (
        <>
            {/* เพิ่มหัวข้อ รพ. และ แผนก */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            {Object.keys(data[0]).map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {Object.values(item).map((value, idx) => (
                                    <td key={idx}>{typeof value === 'boolean' ? (value ? '✔' : '✘') : value}</td>
                                ))}
                                <td>
                                    <ActionButton itemId={item["Equipment ID"]} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <p className='number-rows'>number of rows</p>
                <p className='current-page'>current page</p>
                <div className="button-change-page">
                    <button className='prevpage'>&lt;</button>
                    <button className='nextpage'>&gt;</button>
                </div>
            </div>

        </>
    );
}