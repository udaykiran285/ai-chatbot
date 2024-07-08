import { useState } from 'react'
import {DNA} from 'react-loader-spinner'
import Aside from '../Aside'
import './index.css' 

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyCeC6cm-gKftcy2B5PGFHEVmYU0zvNx6BU");

const apiStatusConstraints = {
    success : "success",
    failure : "failure",
    initial : "initial",
    loading : "loading"
}

const Home = () => {
    const [searchvalue,setSearchValue] = useState("")
    const [apiStatus,setApiStatus] = useState(apiStatusConstraints.initial)
    const [response,setResponse] = useState([])
    const [history,setHistory] = useState([])

    const onUserInput = (e) => {
        setSearchValue(e.target.value)
    }

    const makeLines = (text) => {
        const arry = [""];
        for (let i of text){
            if (i==="*"){
                break;
            }
            arry[0] += i
        }

        for (let i = 0; i < text.length; i++) {
            if (text[i] === "*" && text[i + 1] === " ") {
                let line = "";
                let count = i + 2;
                while (count < text.length) {
                    if (text[count] === " " && text[count + 1] === "*") {
                        arry.push(line.replace(/\*\*/g,"").trim());
                        break;
                    }
                    line += text[count];
                    count++;
                }
                if (count >= text.length) {
                    arry.push(line.trim());
                    break;
                }
                i = count;
            }
        }
        setResponse(arry)
        setApiStatus(apiStatusConstraints.success)
    }

    const fetchAnswer = async () => {
        try{
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
            const prompt = searchvalue
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            makeLines(text)
        }
        catch(error){
            console.log(error.message)
            setApiStatus(apiStatusConstraints.failure)
        }
    }

    const askAi = (e) => {
        e.preventDefault()
        setApiStatus(apiStatusConstraints.loading)
        setHistory(prevState => [searchvalue,...prevState])
        fetchAnswer()
    }


    switch(apiStatus){
        case apiStatusConstraints.initial:
            return(
                <div className="main-home-bg">
                    <div className="container-fluid">
                        <div className="row">
                        <aside className="col-md-3 d-none d-md-block m-2">
                            <Aside history={history}/>
                        </aside>
                        <main className="col-12 col-md-8 d-flex flex-column justify-content-evenly align-items-center">
                            <div className='initial-main d-flex flex-column justify-content-center align-items-center'>
                                <img src="https://i.pinimg.com/564x/16/df/e4/16dfe40ae4f39e0e76674f3fbb3bf626.jpg" className='logo-section' alt="logo"/>
                                <h1>How Can I Help You Today..!</h1>
                            </div>
                            <form onSubmit={askAi}>
                                <input type="search" placeholder ="Ask any Question..." className='input-main' value={searchvalue} onChange={onUserInput}/>
                                <button className='main-run-btn' type="submit">Ask to AI</button>
                            </form>
                        </main>
                        </div>
                    </div>
                </div>
            )
        case apiStatusConstraints.loading:
            return(
                <div className="main-home-bg">
                    <div className="container-fluid">
                        <div className="row">
                        <aside className="col-md-3 d-none d-md-block m-2">
                            <Aside history={history}/>
                        </aside>
                        <main className="col-12 col-md-8 d-flex flex-column justify-content-evenly align-items-center">
                            <div className='initial-main d-flex flex-column justify-content-center align-items-center'>
                                <DNA
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{color:"yellow"}}
                                wrapperClass="dna-wrapper"
                                />
                                <p>Generating Response</p>
                                <p>Please Wait....</p>
                            </div>
                        
                            <form onSubmit={askAi}>
                                <input type="search" placeholder ="Ask any Question..." className='input-main' value={searchvalue} onChange={onUserInput}/>
                                <button className='main-run-btn' type="submit">Ask to AI</button>
                            </form>
                            
                        </main>
                        </div>
                    </div>
                    
                </div>
            )
        case apiStatusConstraints.success:
            return(
                <div className="main-home-bg">
                    <div className="container-fluid">
                        <div className="row">
                        <aside className="col-md-3 d-none d-md-block m-2">
                            <Aside history={history}/>
                        </aside>
                        <main className="col-12 col-md-8 d-flex flex-column justify-content-evenly align-items-center">
                            <div className='response-text-container'>
                                {response.map(eachItem => <p>{eachItem}</p>)}
                                <p className='response-text'>{response}</p>
                            </div>
                            <form onSubmit={askAi}>
                                <input type="search" placeholder ="Ask any Question..." className='input-main' value={searchvalue} onChange={onUserInput}/>
                                <button className='main-run-btn' type="submit">Ask to AI</button>
                            </form>
                        </main>
                        </div>
                    </div>
                </div>
            )
        case apiStatusConstraints.failure:
            return(
                <div className="main-home-bg">
                    <div className="container-fluid">
                        <div className="row">
                        <aside className="col-md-4 d-none d-md-block">
                            <h1>ASIDE</h1>
                        </aside>
                        <main className="col-12 col-md-8 d-flex flex-column justify-content-evenly align-items-center">
                            <div className='initial-main d-flex flex-column justify-content-center align-items-center'>
                                <img src="https://i.pinimg.com/564x/16/df/e4/16dfe40ae4f39e0e76674f3fbb3bf626.jpg" className='logo-section' alt="logo"/>
                                <h1>Fetching Failed....</h1>
                                <p>Try Again with a Valid Prompt</p>
                            </div>
                            <form onSubmit={askAi}>
                                <input type="search" placeholder ="Ask any Question..." className='input-main' value={searchvalue} onChange={onUserInput}/>
                                <button className='main-run-btn' type="submit">Ask to AI</button>
                            </form>
                        </main>
                        </div>
                    </div>
                </div>
            )
        default:
            return null;
    }
    
}
export default Home