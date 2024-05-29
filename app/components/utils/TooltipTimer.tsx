import React, { useState, useEffect, ReactNode } from 'react'
import { Tooltip, TooltipProps } from '@nextui-org/react'

interface TooltipTimerProps extends TooltipProps {
  children: ReactNode
  text: string
  duration: number
}

// todo: 可以定时展示, 但同时失去了 hover 后展示的效果
const TooltipTimer: React.FC<TooltipTimerProps> = ({ children, text, duration, ...props }) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, duration * 1000) // 将duration从秒转换为毫秒

    return () => clearTimeout(timer) // 清理定时器
  }, [duration])

  return (
    <Tooltip isOpen={open} content={text} {...props}>
      {children}
    </Tooltip>
  )
}

export default TooltipTimer
