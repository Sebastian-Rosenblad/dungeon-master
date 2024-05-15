import React from "react";

interface ProjectCardPropsM {
  title: string;
  description: string;
  thumbnail: string;
}

export function ProjectCardC(props: ProjectCardPropsM): JSX.Element {
  const { title, description, thumbnail } = props;

  return <div className="project-card">
    <img src={`./images/${thumbnail}.png`} alt="Project Thumbnail" />
    <div className="project-card--text">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>;
}
