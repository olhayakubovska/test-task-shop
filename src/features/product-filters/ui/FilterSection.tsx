"use client";

import { ReactNode, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@/shared/ui/icons";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full font-montserrat items-center justify-between tracking-[1px]  text-left text-xs font-bold uppercase cursor-pointer"
      >
        {title}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      {isOpen && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}
