import {createContext, useEffect, useState,} from "react";

export const HangmanContext = createContext();

export const Provider = ({children}) =>{

    const [globalName, setGlobalName] = useState();

    useEffect(() => {
        try {
            const item = localStorage.getItem("name");
            if (item) {
                setGlobalName(JSON.parse(item));
            }
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
        }
    }, []);

    useEffect(()=>{
        if(globalName){
            localStorage.setItem("name",JSON.stringify(globalName))
        }
    },[globalName])

    return(
        <HangmanContext.Provider value={{ globalName, setGlobalName }}>
            {children}
        </HangmanContext.Provider>
        )



}
