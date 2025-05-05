import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  const [location] = useLocation();

  if (!items || items.length === 0) {
    // Generate breadcrumb items based on current path
    const pathSegments = location.split("/").filter(Boolean);
    items = [{ label: "Home", href: "/" }];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      items.push({
        label:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: currentPath,
      });
    });
  }

  return (
    <Breadcrumb className={`mb-4 ${className}`}>
      <BreadcrumbList className="text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <BreadcrumbItem key={index}>
              {!isLast ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href || "/"}>
                    <a className="text-primary hover:text-primary/80">
                      {item.label}
                    </a>
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-secondarytext">
                  {item.label}
                </BreadcrumbPage>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
