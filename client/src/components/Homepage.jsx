import React from 'react'
import Login from './Login'
import '../assets/scss/Homepage.scss'
import homeimage from '../assets/images/user-coding.png'
import SocketContext from '../context/SocketContext'

function Homepage() {
  return (
    <div className="d-flex homepage-c align-items-md-center">
      <div className='container'>
        <div className="row">
            <div className="col col-12 col-md-7">
                {/* <img src="https://img.freepik.com/free-vector/software-development-team-concept-illustration_335657-5545.jpg?w=740&t=st=1708716188~exp=1708716788~hmac=6bb8bb7ace661ae217fb496a08846c444790a0a6372702e5ddd6d4392b029187" alt="img" /> */}
                <img src={homeimage} alt="img" />
            </div>
            <div className="col col-12 col-md-5 my-auto">
                <Login />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage