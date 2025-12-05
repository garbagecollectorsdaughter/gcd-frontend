import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  convertWPLogToLog,
  fetchPage,
  fetchRecentLogs,
} from '@/services/graphql'
import stardivider from '~/images/dividers/bouncing-stars.gif'

export default async function Home() {
  const homepage = await fetchPage('homepage')
  const fetchedLogs = await fetchRecentLogs({ first: 3 })
  const recentLogs = fetchedLogs.edges.map((edge) =>
    convertWPLogToLog(edge.node)
  )

  if (!homepage) {
    return notFound()
  }

  return (
    <section className="mx-auto my-0 w-full">
      <div className="grid grid-cols-[1fr] gap-(--layout-grid-gap) [grid-template-areas:'welcome_welcome'_'updates_updates'_'status_status'_'vibes_vibes'] lg:[grid-template-areas:'welcome_welcome'_'status_vibes'_'updates_vibes']">
        <div className="border-2 border-dashed border-accent bg-surface/50 [grid-area:welcome]">
          <div className="items-center justify-center text-center text-on-surface">
            <h1
              className="text-center [font-family:var(--font-pixel-serif)] text-[2.5rem] tracking-[1px]"
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
        <div
          id="recent-logs"
          className="bg-surface-variant border-accent border-2 self-center rounded-lg [grid-area:updates] p-3 relative"
        >
          <div className="border-5 border-dotted border-accent my-0 mx-auto p-4 relative rounded-lg box-border flex flex-col">
            <div className="bg-surface-variant text-xl font-bold font-cute leading-4 absolute py-0 px-2 right-0 lowercase -top-2.5 z-2">
              <span className="decoration-on-surface-variant text-on-accent decoration-wavy underline underline-offset-4">
                Changelog
              </span>
            </div>

            {/* Recent logs will be loaded here dynamically */}
            {recentLogs.map((log) => (
              <div
                key={log.databaseId}
                className="text-on-surface overflow-x-clip overflow-y-auto mt-2 text-lg p-2 leading-5"
              >
                <h2 className="text-on-accent">{log.title}</h2>
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: log.content }}
                />
                <figure className="mx-auto my-0 w-full text-center">
                  <Image src={stardivider} alt="" className="my-2.5 mx-auto" />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
