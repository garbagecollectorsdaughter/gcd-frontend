import Script from 'next/script'

export default function AccessCounter() {
  return (
    <div className="access-counter">
      <Script id="access-counter" src="/scripts/fc2Counter.js"></Script>
      <span id="fc2Counter"></span>&nbsp;
    </div>
  )
}
