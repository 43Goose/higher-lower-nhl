import SideNav from "../../ui/dashboard/side-nav";

// Layout for dashboard pages with Side Navigation
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex w-full grow md:grow bg-slate-950">{children}</div>
        </div>
    );
}