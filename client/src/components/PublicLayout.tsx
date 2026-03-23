import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </div>
  );
}
