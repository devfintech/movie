import { FC } from "react"
import { Helmet } from "react-helmet"

interface MetaHeadProps {
  title?: string
  description?: string
  thumbnail?: string
  url?: string
}

export const MetaHead: FC<MetaHeadProps> = ({
  title = "Template Dapp ReactJs",
  description = "",
  thumbnail = "/thumbnail.png",
  url = window?.location?.href || "",
}) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Optional: Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnail} />
    </Helmet>
  )
}
