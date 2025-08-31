import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Root } from './styles'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Content } from './styles'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prof. Schimd - ITIS Zuccante',
  description: 'Materiale didattico per l\'Istituto Zuccante',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={`${inter.className} ${Root.BODY}`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className={`flex-grow ${Content.CONTAINER} py-8`}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
