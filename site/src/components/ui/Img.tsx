import { useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import clsx from 'clsx'

/**
 * Image that decodes off the main thread and fades in once loaded,
 * instead of popping in line by line. Handles cached images that
 * finish loading before React attaches onLoad.
 */
export function Img({ className, onLoad, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      decoding="async"
      loading="lazy"
      draggable={false}
      {...rest}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
      className={clsx('transition-opacity duration-700 ease-out', loaded ? 'opacity-100' : 'opacity-0', className)}
    />
  )
}
