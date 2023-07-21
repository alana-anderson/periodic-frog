import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-2xl font-semibold tracking-tight'>Home page</h1>
      </div>
    </section>
  )
}
