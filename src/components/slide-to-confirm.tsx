import React from 'react'
import {
  motion,
  useAnimation,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion'

type Props = {
  label: string
  onConfirm: () => void
}

const RIGHT_OFFSET = 260
const MARGIN_OF_ERROR = 20

const SlideToConfirm = ({ label, onConfirm }: Props) => {
  const controls = useAnimation()
  const offset = useMotionValue(0)
  const opacity = useTransform(offset, [0, RIGHT_OFFSET], [1, 0])
  const background = useTransform(
    offset,
    [0, RIGHT_OFFSET],
    ['#3b96fa', '#96ea64']
  )

  const handlePan = (event: any, info: PanInfo) => {
    if (info.offset.x > 0 && info.offset.x <= RIGHT_OFFSET) {
      controls.set({
        x: info.offset.x,
      })
    }
  }

  const handlePanEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > RIGHT_OFFSET - MARGIN_OF_ERROR) {
      onConfirm()
    } else {
      controls.start({ x: 0 })
    }
  }

  return (
    <motion.div className="slide-to-confirm" style={{ background }}>
      <motion.span style={{ opacity }}>{label}</motion.span>
      <motion.div
        className="toggle"
        animate={controls}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{
          x: offset,
        }}
      >
        &#187;
      </motion.div>
    </motion.div>
  )
}

export default SlideToConfirm
