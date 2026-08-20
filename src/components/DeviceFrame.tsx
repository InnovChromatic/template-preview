import { useEffect, useRef, useState } from 'react'

export type Device = 'desktop' | 'tablet' | 'mobile'

const SPECS: Record<Device, { width: number; height: number; radius: number }> = {
  desktop: { width: 1280, height: 800, radius: 16 },
  tablet: { width: 768, height: 1024, radius: 24 },
  mobile: { width: 390, height: 844, radius: 36 },
}

export function DeviceFrame({ device, src }: { device: Device; src: string }) {
  const spec = SPECS[device]
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const update = () => {
      const next = Math.min(1, host.clientWidth / spec.width)
      setScale(next)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(host)
    return () => observer.disconnect()
  }, [spec.width])

  return (
    <div ref={hostRef} className="flex w-full justify-center">
      <div
        className="overflow-hidden border-8 border-ink bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
        style={{
          width: spec.width * scale,
          height: spec.height * scale,
          borderRadius: spec.radius,
        }}
      >
        <iframe
          key={src}
          title="Template preview"
          src={src}
          className="origin-top-left bg-white"
          style={{
            width: spec.width,
            height: spec.height,
            transform: `scale(${scale})`,
            border: 0,
          }}
        />
      </div>
    </div>
  )
}
