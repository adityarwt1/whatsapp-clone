"use client";
import { ArrowLeft, Camera, Edit } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { logout } from "@/actions/auth-actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

export function ProfileView() {
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState(userInfo.profilePicture);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetchuser", {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("user information goes here");
        setUserInfo(data.user);
      }
    } catch {
      console.log("error to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateUser = async () => {
    try {
      const response = await fetch(
        `/api/update?name=${name || userInfo.firstName}&status=${
          status || userInfo.status
        }&id=${userInfo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ imageUrl }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "User Update Successfully",
          description: "your's information update for everyone",
        });

        setUserInfo(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fileBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const url = await fileBase64(file);
      setImageUrl(url as string);
    } else {
      console.log("provide file first");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[#111b21]">
        <div className="flex items-center p-4 border-b border-[#313d45]">
          <Link href="/">
            <Button className="rounded-full text-[#8696a0] hover:text-white hover:bg-[#313d45] mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 mt-10">
          <div className="max-w-md mx-auto space-y-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-4 bg-gray-600 animate-pulse ">
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 flex items-center justify-center right-0 rounded-full bg-[#00a884] border-0 text-white hover:bg-[#00a884]/90 w-10 h-10"
                >
                  <Edit className="w-5 h-5" />
                </label>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#8696a0] font-medium">
                    Your name
                  </label>
                </div>
                <Input className="bg-[#2a3942] border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 animate-pulse" />
              </div>

              <div>
                <p className="text-xs text-[#8696a0] mb-1">
                  This is not your username or pin. This name will be visible to
                  your WhatsApp contacts.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8696a0] font-medium">
                  About
                </label>
                <div className="flex items-center">
                  <Textarea className="bg-[#2a3942] animate-pulse border-0 text-white resize-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8696a0] font-medium">
                  Phone number
                </label>
                <Input
                  disabled
                  className="bg-[#2a3942] animate-pulse border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 opacity-70"
                />
              </div>
            </div>

            <div className="pt-4 flex ">
              <Button className="w-full mx-1 bg-red-600 hover:bg-red-700 text-white">
                Log out
              </Button>
              <Button className="w-full mx-1 bg-[#00A884]  hover:bg-[#00a884]/90  text-white">
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!loading)
    return (
      <div className="flex flex-col h-full bg-[#111b21]">
        <div className="flex items-center p-4 border-b border-[#313d45]">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-[#8696a0] hover:text-white hover:bg-[#313d45] mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-md mx-auto space-y-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-4 rounded-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    width={100}
                    height={100}
                    className=""
                    alt="profile"
                  />
                ) : (
                  <Image
                    src={userInfo.profilePicture}
                    width={100}
                    height={100}
                    className=""
                    alt="profile"
                  />
                )}
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 flex items-center justify-center right-0 rounded-full bg-[#00a884] border-0 text-white hover:bg-[#00a884]/90 w-10 h-10"
                >
                  <Edit className="w-5 h-5" />
                </label>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#8696a0] font-medium">
                    Your name
                  </label>
                </div>
                <Input
                  defaultValue={userInfo?.firstName}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#2a3942] border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div>
                <p className="text-xs text-[#8696a0] mb-1">
                  This is not your username or pin. This name will be visible to
                  your WhatsApp contacts.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8696a0] font-medium">
                  About
                </label>
                <div className="flex items-center">
                  <Textarea
                    defaultValue={userInfo?.status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-[#2a3942] border-0 text-white resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#8696a0] font-medium">
                  Phone number
                </label>
                <Input
                  defaultValue={userInfo?.phoneNumber}
                  disabled
                  className="bg-[#2a3942] border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 opacity-70"
                />
              </div>
            </div>

            <div className="pt-4 flex ">
              <Button
                onClick={logout}
                variant="destructive"
                className="w-full mx-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Log out
              </Button>
              <Button
                variant="destructive"
                onClick={updateUser}
                className="w-full mx-1 bg-[#00A884]  hover:bg-[#00a884]/90  text-white"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}
