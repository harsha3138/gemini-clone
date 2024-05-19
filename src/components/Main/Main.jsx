import React, { useContext} from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, input, setPrevPrompt, setRecentPrompt, setInput, homeScreen } = useContext(Context); 

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && input.trim() !== '') {
            event.preventDefault();
            onSent();
        }
    };

    return (
        <div className='main'>
            <div className='nav'>
                <p onClick={() => {homeScreen();}}>Gemini</p>
                <img src={assets.dp_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Create a 5 day itinerary for France</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm a tagline for my online store</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Help me draft a respond to my friend</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Generate unit test for the following C# function</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <div className='result'>
                        <div className="result-title">
                            <img className='dpIcon' src={assets.dp_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img className='geminiIcon' src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div> :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
