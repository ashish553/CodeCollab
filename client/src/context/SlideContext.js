import { createContext,useState } from "react";

const SlideContext = createContext(null);

function SlideContextProvider({children}){
    const [slideShow, setslideShow] = useState(true)
    return(
        <SlideContext.Provider value={{slideShow,setslideShow}}>
            {children}
        </SlideContext.Provider>
    )
}

export default SlideContextProvider
export {SlideContext}