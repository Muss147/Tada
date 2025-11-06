import { cn } from "@tada/ui/lib/utils";
import "@tada/ui/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Providers } from "./providers";
import NavigationLoadingProviders from "./navigation-loading-providers";
import { LayoutClientWrapper } from "./layout-client-wrapper";

// Configuration de la police DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tada",
  description: "Le Uber des collectes de données",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export const preferredRegion = ["fra1", "sfo1", "iad1"];
export const maxDuration = 60;

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          dmSans.variable,
          "whitespace-pre-line overscroll-none antialiased font-sans"
        )}
      >
        <LayoutClientWrapper fontVariable={dmSans.variable}>
          <NavigationLoadingProviders>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Providers params={params}>
                <Toaster />
                {children}
              </Providers>
            </ThemeProvider>
          </NavigationLoadingProviders>
        </LayoutClientWrapper>
      </body>
    </html>
  );
}
