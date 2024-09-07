import '../css/Navbar.css'


// กด Navbar แต่ละหน้าขนาดไม่เท่ากัน 
export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <ul>
                    <a href="/"><li>Data-User</li></a>
                    <a href="/medical-device"><li>Medical-Device</li></a>
                </ul>
            </div>
        </>
    )
}