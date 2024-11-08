import Hls from "hls.js"
import React, { useEffect, useRef } from "react"

interface VideoPlayerProps {
  src: string
  width?: string
  height?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, width = "640px", height = "360px" }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: (xhr) => {
            xhr.withCredentials = true // Set if the server requires credentials (cookies)
          },
        })
        // const hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(videoRef.current)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play()
        })

        return () => {
          hls.destroy()
        }
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        // Nếu trình duyệt hỗ trợ HLS natively (như Safari)
        videoRef.current.src = src
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current?.play()
        })
      }
    }
  }, [src])

  return <video ref={videoRef} controls style={{ width, height }} />
}

export default VideoPlayer
