import { createContext, useState } from "react";

let TabContext = createContext({activeTab: 'Files'})
function TabContextProvider({children}) {
    const [activeTab, setactiveTab] = useState('Files')
    return (
        <TabContext.Provider value={{activeTab: activeTab, setactiveTab: setactiveTab}}>
            {children}
        </TabContext.Provider>
    )
}

export default TabContextProvider
export {TabContext}