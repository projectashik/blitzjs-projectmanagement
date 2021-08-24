import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTasks from "app/tasks/queries/getTasks"
import { CustomLink } from "app/core/components/CustomLink"
import { Button } from "app/core/components/Button"

const ITEMS_PER_PAGE = 100

export const TasksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const projectId = useParam("projectId", "number")
  const [{ tasks, hasMore }] = usePaginatedQuery(getTasks, {
    where: { project: { id: projectId! } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul className="my-5 flex flex-col gap-4">
        {tasks.map((task) => (
          <li key={task.id}>
            {/* @ts-ignore */}
            <CustomLink href={Routes.ShowTaskPage({ projectId, taskId: task.id })}>
              <a>{task.name}</a>
            </CustomLink>
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
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

const TasksPage: BlitzPage = () => {
  const projectId = useParam("projectId", "number")

  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>

      <div>
        <p>
          <CustomLink href={Routes.NewTaskPage({ projectId: projectId! })}>Create Task</CustomLink>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TasksList />
        </Suspense>
      </div>
    </>
  )
}

TasksPage.authenticate = true
TasksPage.getLayout = (page) => <Layout>{page}</Layout>

export default TasksPage
