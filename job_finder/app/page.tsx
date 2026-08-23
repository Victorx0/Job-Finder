import Link from 'next/link'

export default function Home() {

  return (
    <div className="flex h-20 items-baseline">
      <div className='text-2xl align-bottom'>
        Home page
      </div>
      <Link className=" inline-block align-bottom" href={"/sign_up"}>Sign up</Link>
    </div>
  );
}
