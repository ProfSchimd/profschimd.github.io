import Link from 'next/link'
import Image from 'next/image'

import { Header as HeaderStyle } from "@/app/styles"


const navMenu = [
  {
    text: "Materie",
    link: "/materie",
    alt: "Mostra tutte le materi",
  },
  {
    text: "About",
    link: "/about",
    alt: "Informazioni sul sito",
  }
]

export default function Header() {
  return (
    <header className={`${HeaderStyle.CONTAINER}`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="relative text-xl font-bold w-12 h-12">
            <Image src="/favicon.ico" fill alt={''} />
          </Link>
          <div className="flex space-x-6">
            {navMenu.map((item, index) => (
              <Link key={index} href={item.link} className={`${HeaderStyle.NAV_LINK}`}>
                {item.text}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}