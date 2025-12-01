export const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging'
export const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development'
export const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production'

export const CONFIG = {
  api: {
    url: isStaging
      ? process.env.NEXT_PUBLIC_STAGING_GRAPHQL_API
      : process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL,
  },
  siteName: "Garbage Collector's Daughter",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteDescription: 'A blog about software development',
}
