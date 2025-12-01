/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: we're getting the data from wordpress */
import { notFound } from 'next/navigation'

import { fetchPage } from '@/services/graphql'
import { WPPage } from '@/types'

async function fetchData(slug: string[]): Promise<WPPage | null> {
  let page = undefined

  if (slug.length === 1) {
    page = await fetchPage(slug[0])
  }

  if (page) {
    return page
  } else {
    return null
  }
}

function RenderPage({ page }: { page: WPPage }) {
  return (
    <section id="page-content">
      <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
      <div dangerouslySetInnerHTML={{ __html: page.content || '' }} />
    </section>
  )
}

export default async function Archive(props: {
  params: Promise<{ slug: string[] }>
}) {
  const params = await props.params
  const { slug } = params

  const page = await fetchData(slug)

  if (page) {
    return <RenderPage page={page} />
  }

  return notFound()
}
