import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Breadcrumbs from "./Breadcrumbs";

interface HeadingProps {
  title: string;
  description?: string;
  actionButton?: string;
  className?: string;
  items?: { label: string; href: string }[];
}

export const Heading = ({
  title,
  description,
  actionButton,
  className,
  items,
}: HeadingProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-black">{title}</h2>
      </div>
      {description && (
        <p className={`${className}text-xs text-secondarygraycolor`}>
          {description}
        </p>
      )}
      {items && <Breadcrumbs items={items} actionButton={actionButton} />}
    </div>
  );
};

export default Heading;
