import { StatusList } from "@/components/status-list"
import { EmptyState } from "@/components/empty-state"

export default function StatusPage() {
  return (
    <div className="flex h-full">
      <StatusList />
      <EmptyState />
    </div>
  )
}
