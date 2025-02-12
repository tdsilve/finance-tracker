import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar"

type UserAvatarProps = {
  name?: string
  profileImage?: string
}

export const UserAvatar = ({ name, profileImage }: UserAvatarProps) => {
  return (
    <Avatar className="p-2 w-12 h-12  shadow-[0_0_5px_1px_rgba(255,255,255,0.3)]  ">
    <AvatarImage src={profileImage} alt="Profile Image" />
    <AvatarFallback className="text-white p-2 text-xs">{name}</AvatarFallback>
  </Avatar>
  )
}
