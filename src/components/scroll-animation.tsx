"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerChildren?: number
}

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  staggerChildren,
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ...(staggerChildren && { staggerChildren }),
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
