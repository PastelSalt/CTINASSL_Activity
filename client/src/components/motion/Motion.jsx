import { Fragment } from 'react'

/** Splits text into words wrapped for a masked slide-up reveal. The text stays readable as plain text. */
export function Words({ text }) {
  return text.split(' ').map((word, index, all) => (
    <Fragment key={index}>
      <span className="w"><span className="w__in">{word}</span></span>
      {index < all.length - 1 ? ' ' : null}
    </Fragment>
  ))
}

/** `depth` layer: pointer parallax (CSS vars). Inner `drift` layer: scroll parallax (GSAP). They never share a transform. */
export function Depth({ d, speed = 0, children }) {
  return <div className="depth" style={{ '--d': d }}><div className="drift" data-speed={speed}>{children}</div></div>
}
