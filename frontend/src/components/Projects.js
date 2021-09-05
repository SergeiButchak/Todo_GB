import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tbody>
            <tr>
                <td>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </td>
                <td>
                    {project.repLink}
                </td>
            </tr>
        </tbody>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table border={"1px"} cellPadding={"5px"} cellSpacing={"0"}>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Link
                    </th>
                </tr>
            </thead>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>

    )
}

export default ProjectList;