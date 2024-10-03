"use client"
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";


const Navbar = () => {  
  const router = useRouter()
 const {data:session} = useSession() ; 
 const user : User = session?.user  as User;

 
  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <a href="#" className="text-xl font-bold mb-4 md:mb-0">
        True Feedback
      </a>
      {session ? (
        <>
         {
          user?.image ? <span><Image  className="rounded-full relative left-[3rem] " src={user?.image} alt="user-logo" width={40} height={40}/> </span> : " "
         }
          <span className="ml-[-10rem]">
            Welcome, {user?.name ?? user?.username }
          </span>
          <Button onClick={() => signOut({
            redirect:true ,
            callbackUrl:"/sign-in"
          })} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
            Logout
          </Button>
        </>
      ) : (
        <>  
        <h1 onClick={() => router.push("/sign-in")} className="cursor-pointer
         bg-white  px-5 py-2 rounded-xl text-black
        ">Login</h1>
        </>
      )}
    </div>
  </nav>
  )
}

export default Navbar
