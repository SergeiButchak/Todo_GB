import React from "react";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repLink}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <tbody>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Link
                </th>
            </tr>
            {/*{projects.name}*/}
            {projects.map((project) => <ProjectItem project={project} />)}
        </tbody>

    )
}

export default ProjectList;