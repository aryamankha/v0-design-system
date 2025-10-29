import { cn } from '#/app/lib/utils'

export function IconLockOthers({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn('h-4 w-4', className)}
    >
      <path
        d="M6.74884 6.75L2.24884 2.25M5.99884 1.5H1.75C1.61193 1.5 1.5 1.61193 1.5 1.75V6"
        stroke="#717179"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0001 9.4V10.2H10.6001V9.4C10.6001 8.73726 11.1374 8.2 11.8001 8.2C12.4628 8.2 13.0001 8.73726 13.0001 9.4ZM9.4001 10.2V9.4C9.4001 8.07452 10.4746 7 11.8001 7C13.1256 7 14.2001 8.07452 14.2001 9.4V10.2H15.0001V13.8C15.0001 14.4627 14.4628 15 13.8001 15H9.8001C9.13736 15 8.6001 14.4627 8.6001 13.8V10.2H9.4001Z"
        fill="#717179"
      />
    </svg>
  )
}
