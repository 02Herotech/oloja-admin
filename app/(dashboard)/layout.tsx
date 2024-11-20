import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";

export const metadata: Metadata = {
    title: {
        template: "Oloja-Admin | %s",
        default: "Oloja-Admin",
    },
    description: "At Oloja marrketplace, we provide you with the best products and services",
    openGraph: {
        type: "website",
        locale: "en_US",
        title: "Oloja-Admin",
        description: "At Oloja marrketplace, we provide you with the best products and services",
        siteName: "Oloja-Admin",
    },
};

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <section className='h-screen'>
            <Header />
            <div className='flex'>
                <Navigation />
                <main className="w-full lg:ml-[278px] lg:w-[calc(100%-278px)]">
                    <section className='bg-white max-lg:container lg:w-full min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-80px)] py-4 lg:p-7 mt-[72px] lg:mt-20 max-lg:pb-20'>
                        {children}
                    </section>
                </main>
            </div>
        </section>
    );
};

export default Layout;
