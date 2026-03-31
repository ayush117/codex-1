import './globals.css';

export const metadata = {
  title: 'AI Job Platform',
  description: 'Next.js full-stack migration'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
