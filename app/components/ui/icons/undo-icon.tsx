export function UndoIcon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.99996 9.33333L2.66663 6L5.99996 2.66666"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 6H9.66663C10.1481 6 10.6249 6.09484 11.0698 6.27911C11.5147 6.46338 11.9189 6.73346 12.2594 7.07394C12.5998 7.41442 12.8699 7.81863 13.0542 8.26349C13.2385 8.70835 13.3333 9.18515 13.3333 9.66667C13.3333 10.1482 13.2385 10.625 13.0542 11.0698C12.8699 11.5147 12.5998 11.9189 12.2594 12.2594C11.9189 12.5999 11.5147 12.87 11.0698 13.0542C10.6249 13.2385 10.1481 13.3333 9.66663 13.3333H7.33329"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}
