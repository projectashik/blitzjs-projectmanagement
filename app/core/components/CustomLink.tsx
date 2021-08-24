import { Link } from "blitz"

export const CustomLink = ({ children, href }: any) => {
  return (
    <Link href={href}>
      <a className="text-purple-700">{children}</a>
    </Link>
  )
}
