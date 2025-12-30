import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { User } from "@/types";

export function UserAvatar({ User }: { User: User | null }) {
  return (
    User && (
      <HoverCard>
        <HoverCardTrigger className="flex justify-center" asChild>
          <Button variant="link" size={"sm"} className="cursor-pointer mx-auto">
            {User.name}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit">
          <div className="flex justify-between items-center gap-1">
            <Avatar className="border-2 border-gray-500">
              <AvatarImage src="/devnagri.png" />
              <AvatarFallback>
                {User.name[0] + User.name.split(" ")[1]?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{User.name}</h4>
              <p className="text-sm font-medium">{User.email}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  );
}
