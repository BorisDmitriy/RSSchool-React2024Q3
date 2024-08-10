import '../src/styles/globals.css';
import ClientProviders from './ClientProvider';

export const metadata = {
  title: 'Speice in Star Wars',
  description: 'Speice in Star Wars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('RootLayout');

  return (
    <html lang="en">
      <ClientProviders>
        <body>{children}</body>
      </ClientProviders>
    </html>
  );
}
