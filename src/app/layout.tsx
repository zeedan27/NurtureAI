import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "শিশু যত্ন — Child Care AI",
  description: "শিশুর স্বাস্থ্য ও বিকাশের সঙ্গী — বাংলাদেশের গ্রামীণ পরিবারের জন্য। Child health & development companion for rural Bangladesh families.",
  keywords: ["child care", "Bangladesh", "health", "vaccination", "nutrition", "শিশু যত্ন", "টিকাকরণ"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👶</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
