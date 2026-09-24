"use client"
import {useState } from "react"
import { supabaseDBClient } from "@/components/Supabase/SupabaseClient"
import { useRouter } from "next/navigation"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [sent, setSent] = useState(false)

    const supabaseClient = supabaseDBClient

    const router = useRouter()

    const handleSubmit = async (e : React.FormEvent) => {
        if(!sent){
            setSent(true)
            e.preventDefault()
            const {data, error} = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            })
            console.log(data)
            if (error) {
                console.log(error.message)
            } else {
                router.push("/")
            }

        }
        
    }

    return (
        <div className="flex items-center justify-center flex-1">
            <form onSubmit={handleSubmit} className="gap-5 border-2 p-10 rounded-lg">
                <div>Login</div>
                <label className="block">
                    <div>Email</div>
                    <input type="text" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        setSent(false)
                    }} className="border-2 rounded-md"/>
                </label>
                <label className="block">
                    <div>Password</div>
                    <input type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setSent(false)
                        }} className="border-2 rounded-md"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}