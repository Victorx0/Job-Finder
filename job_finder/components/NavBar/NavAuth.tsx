"use client"
import { useState } from "react"

export default function NavAuth(){
    const [isAuth, setAuth] = useState(false)
    return (
        <div>
            {
            !isAuth &&
            <div>
                <div>Sign Up</div>
                <div>Login</div>
            </div>
            }

            {
            isAuth &&
            <div>Profile</div>
            }
        </div>
    )
}