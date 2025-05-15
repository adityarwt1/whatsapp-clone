import { SettingsList } from "@/components/settings-list"
import { GeneralSettings } from "@/components/general-settings"

export default function SettingsPage() {
  return (
    <div className="flex h-full">
      <SettingsList />
      <GeneralSettings />
    </div>
  )
}
