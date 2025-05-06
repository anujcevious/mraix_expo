
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Breadcrumbs from "./Breadcrumbs";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
  items?: { label: string; href: string }[];
}

export default function Heading({
  title,
  description,
  className,
  items,
}: HeadingProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-black">{title}</h2>
        {user?.name && <span className="text-sm text-gray-600">Welcome, {user.name}</span>}
      </div>
      {description && (
        <p className={`${className}text-xs text-secondarygraycolor`}>
          {description}
        </p>
      )}
      {items && <Breadcrumbs items={items} />}
    </div>
  );
}
