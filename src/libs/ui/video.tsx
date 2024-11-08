import { FC, VideoHTMLAttributes } from "react"

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src?: string
  type?: string
}

export const Video: FC<VideoProps> = ({ src, type = "video/mp4", ...props }) => {
  return (
    <video autoPlay loop muted playsInline {...props}>
      <source src={src} type={type} />
    </video>
  )
}
