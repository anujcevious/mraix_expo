
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Breadcrumbs from "./Breadcrumbs";

interface HeadingProps {
  title: string;
  description?: string;
  items?: { label: string; href: string }[];
}

export function Heading({ title, description, items }: HeadingProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      {items && <Breadcrumbs items={items} />}
    </div>
  );
}

export default Heading;
