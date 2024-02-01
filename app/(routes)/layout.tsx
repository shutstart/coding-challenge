import "../_styles/global.css";
import Modal from "../components/modal";
import Nav from "../components/nav";

export const metadata = {
  title: "MovieMann",
  description: "Eine Film-App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning={true}>
      <body className="p-4 max-w-[1600px] mx-auto">
        <Nav />

        {children}
      </body>
    </html>
  );
}
