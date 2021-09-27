import { SVGProps } from 'react'

export function BackArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 14L4 9l5-5" />
      <path d="M20 20v-7a4 4 0 00-4-4H4" />
    </svg>
  )
}
