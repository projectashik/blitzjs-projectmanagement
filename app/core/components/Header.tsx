import logout from "app/auth/mutations/logout"
import { Link, Routes, useMutation } from "blitz"
import { Suspense } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Button } from "./Button"

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="bg-purple-600 text-white py-2 px-3 rounded hover:bg-purple-800 block">
        {children}
      </a>
    </Link>
  )
}

const Nav = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  return (
    <nav>
      {!currentUser ? (
        <ul className="flex gap-8">
          <li>
            <NavLink href={Routes.LoginPage()}>Login</NavLink>
          </li>
          <li>
            <NavLink href={Routes.SignupPage()}>Register</NavLink>
          </li>
        </ul>
      ) : (
        <ul className="">
          <li>
            <Button
              onClick={async () => {
                await logoutMutation()
              }}
            >
              Logout
            </Button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export const Header = () => {
  return (
    <header className="flex sticky top-0 z-30 bg-white justify-end h-20 items-center px-6 border-b">
      <Suspense fallback="Loading...">
        <Nav />
      </Suspense>
    </header>
  )
}
