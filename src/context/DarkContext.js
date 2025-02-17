import { createContext, useContext } from "react";

export const DarkContext = createContext({
    themeMode: "light" ,
    setThemeMode:()=>{}
});

export const DarkProvider= DarkContext.Provider;

export const useTheme = () =>{
    return useContext(DarkContext);
};
