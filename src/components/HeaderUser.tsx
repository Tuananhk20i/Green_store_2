import Image from "next/image"
import { useAuth } from "@/lib/auth-context"

export default function HeaderUser() {
  const { user } = useAuth()

  return (
    <div className="flex items-center gap-2">
      <Image
        src={user?.avatar || "/default-avatar.png"}
        alt="avatar"
        width={36}
        height={36}
        className="rounded-full object-cover"
      />

      <span className="text-green-600 font-semibold">
        {user?.name}
      </span>
    </div>
  )
}
