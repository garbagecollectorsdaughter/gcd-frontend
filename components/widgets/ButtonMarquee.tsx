import Image from 'next/image'
import Link from 'next/link'
import y2k from '~/images/marquee/000 Y2K NEOCITIES BUTTON 01.png'
import tellingme from '~/images/marquee/A1EysEc.png'
import acab from '~/images/marquee/acab.gif'
import antinazi from '~/images/marquee/antinazi.gif'
import antinft from '~/images/marquee/antinft.gif'
import bestviewed from '~/images/marquee/bestview.gif'
import bookmark from '~/images/marquee/bookmark_this_page.gif'
import bratz2 from '~/images/marquee/bratz2.png'
import defund from '~/images/marquee/defund_badge.gif'
import fishtank from '~/images/marquee/fishtank.webp'
import foreveronline from '~/images/marquee/foreveronline.gif'
import freepalestine from '~/images/marquee/free_palestine.gif'
import furby from '~/images/marquee/furby button.png'
import graphicdesign from '~/images/marquee/graphicdesign.png'
import keepwebfree from '~/images/marquee/IMG_1816.gif'
import macmade from '~/images/marquee/macmade2.gif'
import sweet from '~/images/marquee/sweet.png'
import trn from '~/images/marquee/trn.png'
import vim from '~/images/marquee/vim.gif'
import web from '~/images/marquee/web.gif'

export function ButtonMarquee() {
  return (
    <div className="marquee-container" aria-hidden="true" tabIndex={1}>
      <h2 className="sr-only">Button Marquee</h2>
      <div className="marquee">
        <Image src={acab} alt="" unoptimized />
        <Image src={y2k} alt="" unoptimized />
        <Image src={tellingme} alt="" unoptimized />
        <Image src={antinazi} alt="" unoptimized />
        <Image src={antinft} alt="" unoptimized />
        <Image src={bestviewed} alt="" unoptimized />
        <Image src={bookmark} alt="" unoptimized />
        <Image src={bratz2} alt="" unoptimized />
        <Image src={defund} alt="" unoptimized />
        <Image src={foreveronline} alt="" unoptimized />
        <Image src={freepalestine} alt="" unoptimized />
        <Image src={furby} alt="" unoptimized />
        <Image src={graphicdesign} alt="" unoptimized />
        <Image src={keepwebfree} alt="" unoptimized />
        <Image src={macmade} alt="" unoptimized />
        <Image src={sweet} alt="" unoptimized />
        <Image src={trn} alt="" unoptimized />
        <Image src={web} alt="" unoptimized />
        <Link
          href="https://www.tumblr.com/wynns-wonderful-pixel-paradise/725550567512031232/fishtank-88x31-button?source=share"
          target="_blank"
        >
          <Image src={fishtank} alt="" unoptimized />
        </Link>
        <Image src={vim} alt="" unoptimized />
      </div>
      <div className="marquee marquee-copy" aria-hidden="true">
        <Image src={acab} alt="" unoptimized />
        <Image src={y2k} alt="" unoptimized />
        <Image src={tellingme} alt="" unoptimized />
        <Image src={antinazi} alt="" unoptimized />
        <Image src={antinft} alt="" unoptimized />
        <Image src={bestviewed} alt="" unoptimized />
        <Image src={bookmark} alt="" unoptimized />
        <Image src={bratz2} alt="" unoptimized />
        <Image src={defund} alt="" unoptimized />
        <Image src={foreveronline} alt="" unoptimized />
        <Image src={freepalestine} alt="" unoptimized />
        <Image src={furby} alt="" unoptimized />
        <Image src={graphicdesign} alt="" unoptimized />
        <Image src={keepwebfree} alt="" unoptimized />
        <Image src={macmade} alt="" unoptimized />
        <Image src={sweet} alt="" unoptimized />
        <Image src={trn} alt="" unoptimized />
        <Image src={web} alt="" unoptimized />
        <Link
          href="https://www.tumblr.com/wynns-wonderful-pixel-paradise/725550567512031232/fishtank-88x31-button?source=share"
          target="_blank"
        >
          <Image src={fishtank} alt="" unoptimized />
        </Link>
        <Image src={vim} alt="" unoptimized />
      </div>
    </div>
  )
}
