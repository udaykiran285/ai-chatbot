import './index.css'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { MdManageHistory } from "react-icons/md";


const Aside = (props) => {
    const {history} = props
    const navigate = useNavigate()

    const onLogout = () =>  {
        Cookies.remove("jwt_token")
        navigate("/signup")
    }

    return(
        <div className="d-flex flex-column justify-content-between aside-inner-container pt-3 pb-3">
            <div>
                <p className="recent-searches-heading">RECENT SEARCHES</p>
                {history.length === 0 ? (
                    <div className='d-flex flex-column justify-content-center align-items-center no-history-container'>
                        <MdManageHistory className='history-icon'/>
                        <p>No History</p>
                    </div>
                ) : (
                    <div>
                        {history.map(eachItem => (
                        <div className='history-item m-2'>
                            <p>{eachItem}</p>
                        </div>
                    ))}
                    </div>
                )}
            </div>
            <button type="button" className="btn btn-danger" onClick={onLogout}>Logout</button>
        
        </div>
    )
}


export default Aside