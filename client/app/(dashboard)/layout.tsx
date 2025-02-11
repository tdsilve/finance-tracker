export default function Layout({children}:  Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            
            <main className="px-3 lg:px-14"> {children}</main>
           
        </div>
    );
}