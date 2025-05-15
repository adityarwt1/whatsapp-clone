"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function GeneralSettings() {
  const [startAtLogin, setStartAtLogin] = useState(false)
  const [replaceEmoji, setReplaceEmoji] = useState(true)

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">General</h2>

        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Login</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#d1d7db]">Start WhatsApp at login</p>
              </div>
              <Switch
                checked={startAtLogin}
                onCheckedChange={setStartAtLogin}
                className="data-[state=checked]:bg-[#00a884]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Language</h3>
            <div className="flex items-center space-x-4">
              <Globe className="w-5 h-5 text-[#8696a0]" />
              <Select defaultValue="system">
                <SelectTrigger className="w-[240px] bg-transparent border-[#313d45] focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-[#202c33] border-[#313d45] text-white">
                  <SelectItem value="system">System default</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Typing</h3>
            <p className="text-sm text-[#8696a0]">
              Change typing settings for autocorrect and misspelled highlight from Windows Settings.
            </p>

            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#d1d7db]">Replace text with emoji</p>
                  <p className="text-sm text-[#8696a0]">Emoji will replace specific text as you type.</p>
                  <a href="#" className="text-sm text-[#00a884]">
                    See list of text
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="emoji-mode" className="text-[#8696a0]">
                    😊
                  </Label>
                  <Switch
                    id="emoji-mode"
                    checked={replaceEmoji}
                    onCheckedChange={setReplaceEmoji}
                    className="data-[state=checked]:bg-[#00a884]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 text-sm text-[#8696a0]">
            <p>
              To log out of WhatsApp on this computer go to your{" "}
              <a href="#" className="text-[#00a884]">
                Profile
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
