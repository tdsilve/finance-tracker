import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type UserAvatarProps = {
  name?: string;
  profileImage?: string;
};

export const UserAvatar = ({ name, profileImage }: UserAvatarProps) => {
  const displayName = name && name?.length > 2 ? name?.slice(0, 2) : name;
  return (
    <Avatar className="size-12 p-2 shadow-[0_0_5px_1px_rgba(255,255,255,0.3)]  ">
      <AvatarImage src={profileImage} alt="Profile Image" />
      <AvatarFallback className="p-2 text-xs uppercase text-white">
        {displayName}
      </AvatarFallback>
    </Avatar>
  );
};
