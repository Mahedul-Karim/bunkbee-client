import React from "react";
import { Sidebar } from "@/components/dashboard/common/Sidebar";
import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileSidebar = ({ links }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            variant="ghost"
            className={
              "text-primary flex md:hidden hover:bg-transparent  hover:text-primary"
            }
          >
            <AlignLeft className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-r border-border overflow-auto"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4 xs:p-6">
            <Sidebar links={links} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
