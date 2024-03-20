import React, { useContext } from 'react'
import { TabContext } from '../../context/TabContext'
import { SlideContext } from '../../context/SlideContext';
// import chat from '../../assets/images/chat-text.svg'

function Tab({iconName, iconDesc, tabName}) {
  const {activeTab, setactiveTab} = useContext(TabContext)
  const {slideShow, setslideShow} = useContext(SlideContext)
  console.log('dfgasghdas',activeTab);
  return (
    <div className='tabItem'>
        <img src={iconName} alt={iconDesc} onClick={()=>{
          setactiveTab(tabName)
          tabName === activeTab ? setslideShow(!slideShow) : setslideShow(true) 
        }}/>
    </div>
  )
}

export default Tab