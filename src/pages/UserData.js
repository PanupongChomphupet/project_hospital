import Navbar from '../components/Navbar'
import Header from '../components/Header'
import '../css/UserData.css'
import axios from 'axios'

export default function Userdata() {
    const apiCall = () => {
        axios.get('http://localhost:8080').then((result) => {
        })
    }

    return (
        <>
            <Header />
            <div className="display-flex">
                <Navbar />
                <div className="user-data">
                    <h1>User Data</h1>
                    <button onClick={apiCall}>click</button>
                </div>
            </div>
        </>

    )
}