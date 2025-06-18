import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(waitlist)/preregister')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/preregister"!</div>
}
