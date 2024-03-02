import React from 'react'

function Chat({self, senderName='', msg, sendTime}) {
    const [time, period] = sendTime.split(' ')
    const formattedTime = `${time.substring(0,5)} ${period}`
  return (
    <div className={`msg ${self ? 'selfmsg' : 'usermsg'}`}>
        <div className="msgDetails d-flex justify-content-between">
            <p className="userName mb-0"><strong>{senderName || 'You'}</strong></p>
            <p className="time mb-0">{formattedTime}</p>
        </div>
        <p className='msgContent mb-0'>{msg}</p>
    </div>
    )
}

export default Chat