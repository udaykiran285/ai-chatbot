import {useEffect, useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Signup = () => {
    const navigate = useNavigate()
    const [fullname,setFullname] = useState("")
    const [gmail,setGmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [gmailErrMsg,setGmailErrMsg] = useState("")
    const [fullnameErrMsg,setFullnameErrMsg] = useState("")
    const [passwordErrMsg,setPasswordErrMsg] = useState("")

    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token")
        if(jwtToken !== undefined){
            navigate("/")
        }
    },[])
    
    

    const onFullname = (e) => {
        setFullname(e.target.value)
    }

    const onGmail = (e) => {
        setGmail(e.target.value)
    }

    const onPassword = (e) => {
        setPassword(e.target.value)
    }

    const onConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const validateUserData = async () => {
        const userData = {
            fullname :fullname,
            gmail : gmail,
            password : password,
        }

        const apiUrl = "http://localhost:4000/signup";
        const options = {
            method : "POST",
            headers :  {
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify(userData),
        }

        try{
            const response = await fetch(apiUrl,options)
            if(response.status === 200){
                const jsonData = await response.json()
                const jwtToken =jsonData.jwtToken
                Cookies.set("jwt_token",jwtToken,{expires:30})
                navigate("/")
            }
            else{
                const jsonData = await response.json()
                if(jsonData.userExist){
                    setGmailErrMsg("Gmail Already Exist!! Please Login...")
                }
            }
        }catch(e){
            console.log(e.message)
        }
        
    }

    const onSignup = (e) => {
        e.preventDefault()
        if(fullname.length < 4 && (password !== confirmPassword || password.trim() === "" || confirmPassword.trim() === "")){
            setFullnameErrMsg("Name should be atleast four characters")
            setPasswordErrMsg("Password Didn't match")
        }
        else if(fullname.length < 4){
            setPasswordErrMsg("")
            setFullnameErrMsg("Name should be atleast four characters")
        }
        else if ((password !== confirmPassword || password.trim() === "" || confirmPassword.trim() === "")){
            setFullnameErrMsg("")
            setPasswordErrMsg("Password Didn't match")
        }
        else{
            setFullnameErrMsg("")
            setPasswordErrMsg("")
            validateUserData()
        }
    }

    return(
        <div className='container-fluid'>
        <div className='row'>
            <div className="signup-bg d-flex flex-row justify-content-evenly align-items-center">
                <div className='d-none d-md-inline col-md-6'>
                    {/* <img src="https://i.pinimg.com/originals/b4/d1/33/b4d133975e2545f757338da16220e3db.gif" alt="ai" className='signup-bg-img'/> */}
                    <video height="360" autoPlay loop muted src="https://res.cloudinary.com/djhzxvu0f/video/upload/v1720016871/14627d3026dead7d35d053148fb85d93_l6esn3.mp4">
                        Your browser does not support the video tag.
                    </video>
                    <h1>AI's Revolution...</h1>
                </div>
                <div>
                <h1 className='d-md-none'>AI's Revolution...</h1>
                <form className='form-signup' onSubmit={onSignup}>
                    <h1>SIGNUP</h1>
                    <label htmlFor="fullname">FULLNAME</label><br/>
                    <input type="text" id="fullname" value={fullname} onChange={onFullname}/><br/>
                    <p>{fullnameErrMsg}</p>

                    <label htmlFor='gmail'>GMAIL</label><br/>
                    <input type="email" id="gmail" value={gmail} onChange={onGmail}/><br/>
                    <p>{gmailErrMsg}</p>

                    <label htmlFor="password">PASSWORD</label><br/>
                    <input type="password" id="password" value={password} onChange={onPassword}/><br/>
                    <p></p>

                    <label htmlFor="confirm-password">CONFIRM PASSWORD</label><br/>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={onConfirmPassword}/><br/>
                    <p>{passwordErrMsg}</p>

                    <div className='text-center'>
                        <button type="submit">SIGN-UP</button>
                    </div>
                </form>
                <p>Already a User, <Link to="/login" className='login-signup'>Login...</Link></p>
                </div>
            </div>
            

           
        </div>
    </div>
    )
}
export default Signup