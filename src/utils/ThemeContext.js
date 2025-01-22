import React, { createContext,useContext,useEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext()
export const ThemeProvider = ({children})=>{
    const [isDarkMode,setIsDarkMode] = useState(false)
    useEffect(()=>{
        const loadTheme = async()=>{
            const saveTheme =await AsyncStorage.getItem('theme')
            if(saveTheme!==null){
                setIsDarkMode(JSON.parse(saveTheme))
            }
        }
        loadTheme()
    },[])

  const toggleTheme =async ()=>{
    setIsDarkMode((prev)=>{
        const newTheme = !prev
        AsyncStorage.setItem('theme',JSON.stringify(newTheme))
        return newTheme
    })
}
return(
    <ThemeContext.Provider value={{isDarkMode,toggleTheme}}>
        {children}
    </ThemeContext.Provider>
)
}
export const useTheme =()=> useContext(ThemeContext)