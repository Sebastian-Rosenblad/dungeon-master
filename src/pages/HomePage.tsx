import React from "react";
import "./HomePage.scss";
import { BreadcrumbC } from "../components/shared/Breadcrumb";
import { ProjectListC } from "../components/ProjectList";

export function HomePageP(): JSX.Element {
  return (
    <div className="page">
      <BreadcrumbC items={[{ label: "My projects" }]} />
      <ProjectListC />
    </div>
  );
}
