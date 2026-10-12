import { Children, Fragment, isValidElement, useRef, type ReactElement, type ReactNode } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/** Splits text into words (keeping spaces) and keeps elements like <Marked> whole. */
function units(node: ReactNode): ReactNode[] {
  const out: ReactNode[] = []
  Children.forEach(node, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      String(child)
        .split(/(\s+)/)
        .forEach((w) => w && out.push(w))
    } else if (isValidElement(child) && child.type === Fragment) {
      out.push(...units((child as ReactElement<{ children?: ReactNode }>).props.children))
    } else if (child != null && child !== false) {
      out.push(child)
    }
  })
  return out
}

/**
 * Big statement that "reads itself in": each word brightens from a faint
 * print as the paragraph scrolls up through the viewport. Scroll-linked,
 * so it moves exactly with the reader and reverses if they scroll back.
 */
export function ScrollText({ children, className, as: Tag = 'p' }: { children: ReactNode; className?: string; as?: 'p' | 'h2' | 'blockquote' }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.68'] })

  if (reduce)
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    )

  const parts = units(children)
  const words = parts.filter((p) => !(typeof p === 'string' && /^\s+$/.test(p))).length
  let n = 0
  return (
    <Tag ref={ref as never} className={className}>
      {parts.map((p, i) => {
        if (typeof p === 'string' && /^\s+$/.test(p)) return p
        const k = n++
        return (
          <Word key={i} progress={scrollYProgress} range={[k / words, Math.min(1, (k + 1.5) / words)]}>
            {p}
          </Word>
        )
      })}
    </Tag>
  )
}

function Word({ children, progress, range }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <m.span style={{ opacity }}>{children}</m.span>
}
