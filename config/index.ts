export const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging'
export const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development'
export const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production'
export const isCI = !!process.env.CI

const apiUrl = function () {
  if (isStaging) {
    return process.env.NEXT_PUBLIC_STAGING_GRAPHQL_API
  } else if (isCI || isProduction) {
    return process.env.NEXT_PUBLIC_PRODUCTION_GRAPHQL_API
  } else {
    return process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL
  }
}


export const CONFIG = {
  api: {
    url: apiUrl()
  },
  siteName: "Garbage Collector's Daughter",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteDescription: 'A blog about software development',
}
