import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord, totalDelay) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, totalDelay);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const homeScreen = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompt(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let responseArray = response.split("**");
        let boldedResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                boldedResponse += responseArray[i];
            } else {
                boldedResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse = boldedResponse.replace(/\*/g, "<br/>");
        setResultData("");

        let finalResponse = newResponse.split(" ");
        let totalDelay = 0;

        for (let i = 0; i < finalResponse.length; i++) {
            const nextWord = finalResponse[i];
            delayPara(i, nextWord + " ", totalDelay);
            totalDelay += 75;
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        newChat,
        prevPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        setInput,
        homeScreen, 
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
