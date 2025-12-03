import Image from 'next/image'
import { notFound } from 'next/navigation'
import { fetchPage } from '@/services/graphql'
import stardivider from '~/images/dividers/bouncing-stars.gif'

export default async function Home() {
  const homepage = await fetchPage('homepage')

  if (!homepage) {
    return notFound()
  }

  return (
    <section className="mx-auto my-0 w-full">
      <div className="grid grid-cols-[1fr] gap-(--layout-grid-gap) [grid-template-areas:'welcome_welcome'_'updates_updates'_'status_status'_'vibes_vibes'] lg:[grid-template-areas:'welcome_welcome'_'status_vibes'_'updates_vibes']">
        <div className="border-2 border-dashed border-accent bg-surface/50 [grid-area:welcome]">
          <div className="items-center justify-center text-center text-on-surface">
            <h1
              className="text-center [font-family:var(--font-pixel-serif)] text-[2.5rem] tracking-[1px] text-on-primary"
              dangerouslySetInnerHTML={{ __html: homepage.title }}
            />
            <div
              className="w-full [grid-area:welcome]"
              dangerouslySetInnerHTML={{ __html: homepage.content }}
            />
            <figure>
              <Image
                className="mx-auto my-0 mb-3 w-auto"
                src={stardivider.src}
                width={stardivider.width}
                height={stardivider.height}
                alt=""
              />
            </figure>
          </div>
        </div>
        <div id="recent-logs">
          <div className="inner">
            <div className="title">
              <span>Changelog</span>
            </div>

            {/* Recent logs will be loaded here dynamically */}
            <div id="recent-logs-content" />
            <figure>
              <Image
                src={stardivider}
                alt=""
                className="mx-auto my-0 mb-3 w-auto"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
