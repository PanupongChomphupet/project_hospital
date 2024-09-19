import '../css/Navbar.css'

export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <ul>
                    <a href="/"><li>โรงพยาบาล</li></a>
                    <a href="/medical-device"><li>เครื่องมือ-อุปกรณ์</li></a>
                </ul>
            </div>
        </>
    )
}