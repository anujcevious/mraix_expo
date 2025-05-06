
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
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageLayout({
  title,
  description,
  children,
  actionButton,
  breadcrumbs,
}: PageTemplateProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <Heading
          title={title}
          description={description}
          items={breadcrumbs}
        />
        {actionButton && (
          <Button
            onClick={actionButton.onClick}
            variant="primary"
            iconName={actionButton.icon}
          >
            {actionButton.label}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
