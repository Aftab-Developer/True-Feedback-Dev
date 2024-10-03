"use client" ;

import { SessionProvider } from "next-auth/react";

interface Child {
    children : React.ReactNode
}

const AuthProvider = ({children} :Child ) => {
  return (
   <SessionProvider>
     {children}
    </SessionProvider>
  )
}

export default AuthProvider
