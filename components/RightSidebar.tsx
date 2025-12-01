import { ButtonMarquee, Cliques, LinkBack } from '@/components/widgets'

export const RightSidebar = () => {
  return (
    <div id="right-sidebar" className="bg-(image:--sidebar-bg) aside">
      <ButtonMarquee />
      <Cliques />
      <LinkBack />
    </div>
  )
}

export default RightSidebar
