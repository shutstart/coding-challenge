import "../_styles/global.css";

export const metadata = {
  title: "Next.js",
  description: "Barebone Next.js installation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
