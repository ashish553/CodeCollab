import React, { useContext, useState } from 'react'
import Tab from './Tab'
import '../../assets/scss/Editor.scss';
import file from '../../assets/images/file-code.svg'
import chat from '../../assets/images/chat-text.svg'
import people from '../../assets/images/people.svg'
import sliders from '../../assets/images/sliders.svg'
import Slidenav from './Slidenav';
import TabContextP, { TabContext } from '../../context/TabContext';
import { SlideContext } from '../../context/SlideContext';
import CodeEditor from '../CodeEditor';


function Editor() {
  const {activeTab} = useContext(TabContext)
  const {slideShow} = useContext(SlideContext)
  return (
    <div className='sidenavContainer d-flex flex-md-row flex-column-reverse'>
      {/* <TabContextP> */}
        <div className="sidenav-close-bar d-flex flex-row flex-md-column justify-content-around justify-content-md-start">
            <Tab iconName={file} iconAlt="Files icon" tabName={'Files'}/>
            <Tab iconName={chat} iconAlt="Chat icon" tabName={'Chat'}/>
            <Tab iconName={people} iconAlt="People icon" tabName={'People'}/>
            <Tab iconName={sliders} iconAlt="Settings icon" tabName={'Settings'}/>
        </div>
        <Slidenav title={activeTab} visibility={slideShow} />
        <div className="editorContainer custom-scroll">
          <CodeEditor />
        </div>
      {/* </TabContextP> */}
    </div>
  )
}

export default Editor