import { FC, ImgHTMLAttributes } from "react"

import { BASE_S3_URL } from "@/configs/s3.config"

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  path?: string
  defaultImageSrc?: string
}

export const Image: FC<ImageProps> = ({ path, defaultImageSrc, ...props }) => {
  return (
    <img
      onError={(e) => {
        if (e) {
          let _defaultImageSrc = BASE_S3_URL ? `${BASE_S3_URL}/empty.png` : "https://placehold.co/600x400"

          if (defaultImageSrc) {
            _defaultImageSrc = defaultImageSrc
          }

          e.currentTarget.setAttribute("data-error-src", e.currentTarget.src)
          e.currentTarget.src = _defaultImageSrc
        }
      }}
      loading="lazy"
      src={`${BASE_S3_URL}${path}`}
      alt={props?.alt || ""}
      {...props}
    />
  )
}
