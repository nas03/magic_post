import { About, Features, Feedback, Footer, Gallery, Intro, Header } from '@/components'
import Image from 'next/image'

export default function Home() {
  return (
    <div className=' w-[98vw + 2px] justify-center items-center flex flex-col overflow-hidden bg-white'>
      <Header />
      <About />
      <Features />
      <Gallery/>
      <Feedback/>
      <Intro/>
      <Footer/>
    </div>
  )
}
