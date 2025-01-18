import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userContext } from '../../context/UserContext/User.context'

export default function GuestRoute({children}) {

    let {token} = useContext(userContext)
    if(!token){
        return children
    }
    else {
        return <Navigate to="/"/>
    }
}
