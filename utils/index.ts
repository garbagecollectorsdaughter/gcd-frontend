import { formatDistance } from 'date-fns'

export * from './graphql'

export const formatDateAsString = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true })
}
