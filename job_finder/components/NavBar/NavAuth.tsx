"use client"
import { useState } from "react"
import Link from "next/link"

export default function NavAuth(){
    const [isAuth, setAuth] = useState(false)
    return (
        <div>
            {
            !isAuth &&
            <div className="flex gap-5">
                <Link href="./sign_up">Sign Up</Link>
                <Link href="./login">Login</Link>
            </div>
            }

            {
            isAuth &&
            <div>Profile</div>
            }
        </div>
    )
}