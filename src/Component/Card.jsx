import React from 'react'
import './../Styles/Card.css'
export default function Card({name, email, avatar, Id}) {
  return (
    <div>
        <div className="card-container">
            <img src={avatar} alt="profileImg" />
            <div className="card_content">
            <p><span><b> Id:</b></span> {` ${Id*1}`}</p>
             <p><span><b> Name:</b></span> {` ${name}`}</p>
             <p><span><b> Email:</b></span> {` ${email}`}</p>

            </div>

        </div>

    </div>
  )
}
