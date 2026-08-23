"use client"
import { useState } from "react"
import { supabaseDBClient } from "@/components/Supabase/SupabaseClient"


export default function Sign_up(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [sent, setSent] = useState(false)
    const [message, setMessage] = useState("")


    const supabaseClient = supabaseDBClient

    const handleSubmit = async (e : React.FormEvent) => {
        if(!sent){
            e.preventDefault()
            const {data, error} = await supabaseClient.auth.signUp({
                email: email,
                password: password,
            })

            setSent(true)
            if (error) {
                setMessage(error.message)
            } else {
                setMessage("Account Created!")
            }
        }
    }

    return (
        <div className="flex items-center justify-center flex-1">
            <form onSubmit={handleSubmit} className="gap-5 border-2 p-10 rounded-lg">
                <div>Sign Up</div>
                <label className="block">
                    <div>Email</div>
                    <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} className="border-2 rounded-md"/>
                </label>
                <label className="block">
                    <div>Password</div>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="border-2 rounded-md"/>
                </label>
                <input type="submit" value="Submit"/>
                {
                sent &&
                <div>{message}</div>
                }
            </form>

        </div>
    )
}