import React from "react";
import { ProjectListC } from "../components/ProjectList";

export function HomePageP(): JSX.Element {
  return <div className="page">
    <h1>Projects</h1>
    <ProjectListC />
  </div>;
}
