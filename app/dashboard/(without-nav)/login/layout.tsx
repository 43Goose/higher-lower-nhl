// Layout for login page
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-h-screen bg-slate-950">{children}</div>
    );
}