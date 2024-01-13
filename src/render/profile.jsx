import React from 'react'
import '../App.css'
import profile from '../assets/images/profile.jpg'


function Base({children}) {
  return (
    <body className="body" >
        <div>
            <div style={{marginBottom:'5%', display:"flex",justifyContent:"center"}} >
                <div style={{width:"100px",height:"100px", border:'4px solid white',borderRadius:'100px'}} >
                    <img src={profile} style={{width:'100%', height:'100%',borderRadius:'100px'}} alt="" srcset="" />
                </div>
            </div>

            <div>
                {children}

            </div>
        </div>
    </body>
  )
}

export default Base;