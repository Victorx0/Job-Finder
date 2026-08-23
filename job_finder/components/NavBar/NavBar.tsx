import Link from "next/link";
import NavAuth from "./NavAuth";

export default function NavBar(){
    return(
        <div className="flex gap-2 items-baseline justify-between">
            <div className="flex gap-2 items-baseline ">
                <Link href="/" className="text-lg">Job Finder</Link>
                <div className="flex gap-2">
                    <Link href="/jobs">Jobs</Link>
                    <Link href="/startups">Startups</Link>
                    <Link href="/about">About</Link>
                </div>
            </div>
            <div>
               <NavAuth />
            </div>
        </div>
    )
}
