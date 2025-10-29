import { cn } from '#/app/lib/utils'

export function IconLockFiles({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 10.4V11.2H10.6V10.4C10.6 9.73726 11.1373 9.2 11.8 9.2C12.4627 9.2 13 9.73726 13 10.4ZM9.4 11.2V10.4C9.4 9.07452 10.4745 8 11.8 8C13.1255 8 14.2 9.07452 14.2 10.4V11.2H15V14.8C15 15.4627 14.4627 16 13.8 16H9.8C9.13726 16 8.6 15.4627 8.6 14.8V11.2H9.4Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 7V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H7V14.5H4C3.44772 14.5 3 14.0523 3 13.5V1.5H8V5V6.5H9.5H13V7H14.5ZM9.5 5V2.12132L12.3787 5H9.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
