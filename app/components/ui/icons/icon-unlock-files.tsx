import { cn } from '#/app/lib/utils'

export function IconUnlockFiles({
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
        d="M9.39997 10.7499C9.39997 10.1148 8.8851 9.5999 8.24997 9.5999C7.61485 9.5999 7.09997 10.1148 7.09997 10.7499V11.1428H5.89997V10.7499C5.89997 9.45203 6.95211 8.3999 8.24997 8.3999C9.54784 8.3999 10.6 9.45203 10.6 10.7499V11.2H15V14.8C15 15.4627 14.4627 16 13.8 16H9.8C9.13725 16 8.59999 15.4627 8.59999 14.8V11.2H9.39997V10.7499Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 10V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H7V14.5H4C3.44772 14.5 3 14.0523 3 13.5V1.5H8V5V6.5H9.5H13V10H14.5ZM9.5 5V2.12132L12.3787 5H9.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
