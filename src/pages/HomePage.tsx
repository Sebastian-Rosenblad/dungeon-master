import React from "react";
import { ProjectListC } from "../components/ProjectList";

export function HomePageP(): JSX.Element {
  return (
    <div className="page">
      <h2>My projects</h2>
      <ProjectListC />
    </div>
  );
}
