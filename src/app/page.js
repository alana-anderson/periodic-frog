import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <section className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-32'>
      <div className='flex justify-center flex-col items-center'>
        <h1 className='pb-4 text-5xl font-semibold tracking-tight text-slate-800'>Scenario
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-blue-400"> project planning</span>
        , done right.</h1>
        <h5 className='text-m font-semibold tracking-tight text-slate-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h5>
        <div className="flex gap-2 pt-8">
          <button className="btn btn-primary_xl btn-rose">Get Started</button>
          <button className="btn btn-primary_xl btn-white text-rose-500">Live Demo</button>
        </div>
      </div>
      <div className="px-4 py-24">
        <Image 
          src={'/images/NotebookScreenshot.png'}
          height={1000}
          width={2000}
          alt="Notebook Image"
        />
      </div>
    </section>
  )
}
