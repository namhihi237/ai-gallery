'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuItem } from '../components/sidebar/SidebarItem';
import { ROUTE } from '../configs/route';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '../contexts/UserContext';
import { ToastProvider } from '../hooks/useToast';
const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] });
const sidebarsElement: MenuItem[] = [
  {
    title: 'Home',
    iconName: 'FaHome',
    href: ROUTE.HOME,
    isRequiredLogin: false,
  },
  {
    title: 'Gallery',
    iconName: 'GrGallery',
    href: ROUTE.GALLERY,
    isRequiredLogin: true,
  },
  {
    title: 'Upload',
    iconName: 'FaCloudUploadAlt',
    href: ROUTE.UPLOAD,
    isRequiredLogin: true,
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [indexSelected, setSelectedIndex] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const index = sidebarsElement.findIndex((element) => pathname.includes(element.href));
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <html lang="en" className="h-full">
          <body className={`${inter.className} h-full flex flex-col overflow-hidden`}>
            <ToastProvider>
              <Navbar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar selectedIndex={indexSelected} sidebarsElement={sidebarsElement} />
                <main className="flex-grow p-4 overflow-y-auto">{children}</main>
              </div>
            </ToastProvider>
          </body>
        </html>
      </UserProvider>
    </QueryClientProvider>
  );
}
