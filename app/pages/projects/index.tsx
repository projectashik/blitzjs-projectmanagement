import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProjects from "app/projects/queries/getProjects"
import { CustomLink } from "app/core/components/CustomLink"
import { Button } from "app/core/components/Button"

const ITEMS_PER_PAGE = 100

export const ProjectsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="mt-4">
      <h2>Your projects</h2>
      <ul className="mb-4 mt-3 flex flex-col gap-4">
        {projects.map((project) => (
          <li key={project.id}>
            <CustomLink href={Routes.ShowProjectPage({ projectId: project.id })}>
              <a>{project.name}</a>
            </CustomLink>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <Button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </div>
    </div>
  )
}

const ProjectsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>

      <div>
        <p>
          <CustomLink href={Routes.NewProjectPage()}>Create Project</CustomLink>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsList />
        </Suspense>
      </div>
    </>
  )
}

ProjectsPage.authenticate = true
ProjectsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProjectsPage
