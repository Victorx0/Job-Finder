"use client"
import { use, useState } from "react"


export default function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        
    }

    return (
        <div className="flex items-center justify-center flex-1">
            <form onSubmit={handleSubmit} className="gap-5 border-2 p-10 rounded-lg">
                <div>Login</div>
                <label className="block">
                    <div>Username</div>
                    <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} className="border-2 rounded-md"/>
                </label>
                <label className="block">
                    <div>Password</div>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="border-2 rounded-md"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}