import { Image, ImageProps } from "antd"
import { FC } from "react"

interface AntImageProps extends ImageProps {}

export const AntImage: FC<AntImageProps> = ({ fallback = "https://placehold.co/100x100", ...props }) => {
  return <Image loading="lazy" fallback={fallback} {...props} />
}
