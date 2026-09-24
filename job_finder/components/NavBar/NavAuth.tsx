"use client"
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from "react"
import Link from 'next/link';
import Router from 'next/router';
import { supabaseDBClient } from "../Supabase/SupabaseClient"
import { sign } from 'node:crypto';

export default function NavAuth(){
    const [isAuth, setAuth] = useState(false)
    const [sent, setSent] = useState(false)

    const supabaseClient = supabaseDBClient

    const router = useRouter()
    const pathname = usePathname()

    const getUser = async () => {
        const {data, error} = await supabaseClient.auth.getUser()
        if(error)
            return
        else setAuth(true)
    }

    useEffect(() => {
        getUser()
    }, [pathname])

    const signOut = async () => {
        if(sent){
            return
        }
        setSent(true)
        const {error} = await supabaseClient.auth.signOut()

        if (error) {
            console.log(error.message)
        }

        router.refresh()
        setAuth(false)
    }


    return (
        <div className='flex align-baseline'>
            {
            !isAuth &&
            <div className="flex gap-5">
                <Link href="./sign_up">Sign Up</Link>
                <Link href="./login">Login</Link>
            </div>
            }

            {
            isAuth &&
                <button className='border-2 rounded-md px-2' onClick={signOut}>log out</button>
            }
        </div>
    )
}