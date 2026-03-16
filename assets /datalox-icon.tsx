import * as React from "react"

type DataloxMarkIconProps = React.SVGProps<SVGSVGElement>

export function DataloxMarkIcon({ className, ...props }: DataloxMarkIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M5 4v16" />
      <path d="M5 4c9.5 0 14 2.8 14 8s-4.5 8-14 8" />
      <path d="M18 9h3" />
      <path d="M18 15h3" />
    </svg>
  )
}
