import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ConfiguratorProvider } from '@/context/ConfiguratorContext';
import { AudioProvider } from '@/context/AudioContext';
import { ScrollStateProvider } from '@/context/ScrollStateContext';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/ui/Preloader';
import { Navigation } from '@/components/ui/Navigation';
import { ReservationModal } from '@/components/ui/ReservationModal';
import { TelemetryHUD } from '@/components/ui/TelemetryHUD';


export const metadata: Metadata = {
  title: 'VÉRSE | Engineered for the Next Horizon',
  description:
    'Experience VÉRSE: The pure electric performance luxury grand tourer. 0-100 km/h in 2.9s, 680 HP dual synchronous motors, 800V architecture, and computational aerodynamics.',
  keywords: [
    'VERSE',
    'Luxury Electric Car',
    'Electric Grand Tourer',
    'High Performance EV',
    'Automotive 3D Experience',
    'Concept Car',
    'Clean Energy Velocity'
  ],
  authors: [{ name: 'VÉRSE Design & Engineering Studio' }],
  openGraph: {
    title: 'VÉRSE — Pure Electric Performance',
    description:
      'A new expression of electric performance, precision and design. Discover the 3D cinematic automotive launch experience.',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#050608',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050608] text-[#f8fafc] antialiased selection:bg-cyan-500/30 selection:text-white">
        <AudioProvider>
          <ConfiguratorProvider>
            <ScrollStateProvider>
              <Preloader />
              <CustomCursor />
              <Navigation />
              <TelemetryHUD />
              <ReservationModal />
              <main>{children}</main>
            </ScrollStateProvider>
          </ConfiguratorProvider>
        </AudioProvider>
      </body>
    </html>
  );
}

