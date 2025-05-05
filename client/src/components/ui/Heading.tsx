"use client";

import Breadcrumbs from "./Breadcrumbs";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
  items?: { label: string; href: string }[];
}

export function Heading({
  title,
  description,
  className,
  items,
}: HeadingProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-bold text-black">{title}</h2>
      {description && (
        <p className={`${className}text-xs text-secondarygraycolor`}>
          {description}
        </p>
      )}
      {items && <Breadcrumbs items={items} />}
    </div>
  );
}
