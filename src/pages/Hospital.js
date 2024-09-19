import Navbar from '../components/Navbar'
import Header from '../components/Header'

export default function Hospital() {
    return (
        <>
            <Header />
            <div className="display-flex">
                <Navbar />
                <div className="user-data">
                    
                </div>
            </div>
        </>
    )
}