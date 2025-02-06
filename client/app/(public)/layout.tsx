export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 grid-flow-col place-items-center">
      {children}
    </div>
  );
}
