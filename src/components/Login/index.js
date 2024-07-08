import { useEffect ,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
    const [gmail,setGmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token")
        if(jwtToken !== undefined){
            navigate("/")
        }
    },[])

    const fetchLoginDetails = async () => {
        const apiUrl = "https://backend-ai-qo82.onrender.com/login"
        const options = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({gmail,password})
        }

        const response = await fetch(apiUrl,options)
        const jsonData = await response.json()
        console.log(jsonData)
    }

    const onLogin = (e) => {
        e.preventDefault()
        fetchLoginDetails()
    }

    const onUserGmail = (e) => {
        setGmail(e.target.value)
    }

    const onUserPassword = (e) => {
        setPassword(e.target.value)
    }

    return(
    <div className='container-fluid'>
        <div className='row'>
            <div className="signup-bg d-flex flex-row justify-content-evenly align-items-center">
                <div>
                    {/* <img src="https://i.pinimg.com/originals/b4/d1/33/b4d133975e2545f757338da16220e3db.gif" alt="ai" className='signup-bg-img'/> */}
                    <video width="640" height="360" autoPlay loop muted src="https://res.cloudinary.com/djhzxvu0f/video/upload/v1720016871/14627d3026dead7d35d053148fb85d93_l6esn3.mp4">
                        Your browser does not support the video tag.
                    </video>
                    <h1>AI's Revolution...</h1>
                </div>
                <div>
                <form className='form-signup' onSubmit={onLogin}>
                    <h1>LOGIN</h1>
                    <label htmlFor='gmail'>GMAIL</label><br/>
                    <input type="email" id="gmail" onChange={onUserGmail} value={gmail}/><br/>
                    <label htmlFor="password">PASSWORD</label><br/>
                    <input type="password" id="password" onChange={onUserPassword} value={password}/><br/>
                    <div className='text-center'>
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
                <p>New Registration-<Link to="/signup" className='login-signup'>Signup...</Link></p>
                </div>
            </div>
        </div>
    </div>
    
    )
    }
export default Login