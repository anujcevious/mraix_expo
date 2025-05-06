import React from "react";
import Icons from "./Icons";
import Button from "./Button";

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
}

const Breadcrumbs = ({ items, actionButton }: BreadcrumbsProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2 text-xs text-secondarytext">
        {items?.map((item, index) => (
          <React.Fragment key={item.href}>
            <a href={item.href} className="hover:text-primary">
              {item.label}
            </a>
            {index < items.length - 1 && (
              <Icons
                name="chevronRight"
                onClick={() => {}}
                className="text-secondarytext"
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {actionButton && (
        <Button
          onClick={actionButton.onClick}
          iconName={actionButton.icon}
          iconPosition="left"
        >
          {actionButton.label}
        </Button>
      )}
    </div>
  );
};

export default Breadcrumbs;
