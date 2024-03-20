import React, { useContext } from 'react'
import { editorThemes } from '../../resources/themes'
import { SettingContext } from '../../context/SettingContext'

function Settings() {
  const { setTheme, setFont, theme, font } = useContext(SettingContext)
  return (
    <div className="sidebarSectionContainer">
      <div className="title">Settings</div>
      <div className="themeSelectContainer">
        <h6 className='mt-4'>Select Theme</h6>
        <div className="themeSelect">
          <select className="custom-select form-select" aria-label="Default select example" value={theme} onChange={(e) => {
            setTheme(e.target.value)
          }}>
            {
              Object.keys(editorThemes).map(themeKey => {
                return (
                  <option value={editorThemes[themeKey]} key={themeKey}>{themeKey}</option>
                )
              })
            }
          </select>
        </div>
        <h6 className='mt-4'>Select Font Size</h6>
        <div className="input-group mb-3">
          <input value={font} type="number" steps='1' className="custom-select form-control" aria-describedby="basic-addon2" onChange={(e)=>{
            setFont(e.target.value)
          }}/>
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">px</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings