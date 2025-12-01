import Image from 'next/image'
import loader from '~/images/loaders/heart-rainbow.webp'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-base">
      <p className="sr-only">Loading...</p>
      <Image src={loader} alt="" priority />
    </div>
  )
}
