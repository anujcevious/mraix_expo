"use client";
import React from "react";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";

interface ActionButton {
  label: string;
  onClick: () => void;
  icon?: string;
}

interface PageTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actionButton?: ActionButton;
  breadcrumbs?: {
    items: { label: string; href: string }[];
    actionButton?: ActionButton;
  };
}

export default function PageLayout({
  title,
  children,
  actionButton,
  breadcrumbs,
}: PageTemplateProps) {
  const defaultBreadcrumbs = {
    items: [
      { label: "Inventory", href: "/inventory" },
      { label: "Godowns", href: "/inventory/godowns" },
    ],
  };

  return (
    <>
      <div className="flex justify-between">
        <Heading
          title={title || "Godowns"}
          items={breadcrumbs?.items || defaultBreadcrumbs.items}
          actionButton={breadcrumbs?.actionButton}
        />
        {actionButton ? (
          <Button
            onClick={actionButton.onClick}
            variant="primary"
            iconName={actionButton.icon}
          >
            {actionButton.label}
          </Button>
        ) : null}
      </div>
      {children}
    </>
  );
}
