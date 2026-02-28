"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimateIn({ children, className, delay = 0 }: AnimateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
