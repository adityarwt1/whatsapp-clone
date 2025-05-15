import { CallsList } from "@/components/calls-list"
import { EmptyState } from "@/components/empty-state"

export default function CallsPage() {
  return (
    <div className="flex h-full">
      <CallsList />
      <EmptyState />
    </div>
  )
}
