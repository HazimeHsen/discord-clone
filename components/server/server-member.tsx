"use client";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import UserAvatar from "../user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="ml-2 text-indigo-500 size-4" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="ml-2 text-rose-500 size-4" />,
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onCLick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onCLick}
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}>
      <UserAvatar src={member.profile.imageUrl} className="size-7 md:size-8" />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-500 transition",
          params?.memberId === member.id &&
            "dark:text-zinc-200 group-hover:dark:text-white"
        )}>
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
