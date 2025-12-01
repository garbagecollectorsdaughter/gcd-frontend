import Image from 'next/image'
import Link from 'next/link'

import madeByAGirl from '~/images/cliques/madebya-purple.png'
import angelNumbers from '~/images/cliques/tiny-222.png'

export function Cliques() {
  return (
    <div id="cliques">
      <div className="inner">
        <span>Cliques</span>
      </div>
      <div className="clique-wrapper">
        <Link href="https://lovesick.cafe/grrrl" target="_blank">
          <Image
            alt="Made by a Girl: A Mini Clique"
            title="Made by a Girl: A Mini Clique"
            src={madeByAGirl.src}
            width={madeByAGirl.width}
            height={madeByAGirl.height}
          />
        </Link>

        <Link
          href="https://lovesick.cafe/esoterica/angelnumbers"
          target="_blank"
        >
          <Image
            alt="222: Angel Numbers (Alignment: You are in the right place at the right time)"
            title="222: Angel Numbers (Alignment: You are in the right place at the right time)"
            src={angelNumbers.src}
            width={angelNumbers.width}
            height={angelNumbers.height}
          />
        </Link>
      </div>
    </div>
  )
}
