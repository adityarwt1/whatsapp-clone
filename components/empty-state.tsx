import { Lock } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#222e35] text-center p-6">
      <WhatsAppIcon className="w-16 h-16 mb-6" />
      <h1 className="text-3xl font-light text-white mb-4">WhatsApp for Windows</h1>
      <p className="text-[#8696a0] max-w-md mb-6">
        Send and receive messages without keeping your phone online. Use WhatsApp on up to 4 linked devices and 1 phone
        at the same time.
      </p>
      <div className="flex items-center text-xs text-[#8696a0] mt-auto">
        <Lock className="w-3 h-3 mr-1" />
        <span>End-to-end encrypted</span>
      </div>
    </div>
  )
}
