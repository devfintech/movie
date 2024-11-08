export const BASE_S3_URL = ""

export const generateS3Link = (path: string) => {
  return `${BASE_S3_URL}${path}`
}
