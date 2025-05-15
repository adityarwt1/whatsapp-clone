import { ArchivedList } from "@/components/archived-list"
import { EmptyState } from "@/components/empty-state"

export default function ArchivedPage() {
  return (
    <div className="flex h-full">
      <ArchivedList />
      <EmptyState />
    </div>
  )
}
