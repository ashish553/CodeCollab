import React, { createContext } from 'react'
import { useState } from 'react'

const SettingContext = createContext({})

function SettingContextProvider({children}) {

    const [font, setFont] = useState('20')
    const [theme, setTheme] = useState('aura')

  return <SettingContext.Provider value={{font,setFont,theme,setTheme}}>
        {children}
    </SettingContext.Provider>
}


export default SettingContextProvider
export {SettingContext}