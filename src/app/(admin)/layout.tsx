import Navbar from '@/components/Navbar';
import AuthProvider from '@/context/AuthProvider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen"> 
 <AuthProvider>
      <Navbar/>
      {children} 
      </AuthProvider>
    </div>
  );
}