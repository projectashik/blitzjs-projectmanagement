import { ReactNode } from "react"
import { Head } from "blitz"
import { Header } from "../components/Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "ProjectManagement"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container mx-auto px-4">{children}</div>
    </>
  )
}

export default Layout
