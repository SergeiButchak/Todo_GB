import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProjectDetailItem = ({project}) => {
    return (
        <tbody>
            <tr>
                <td>
                    {project.name}
                </td>
                <td>
                    <a href={`${project.repLink}`}>{project.repLink}</a>
                </td>
                <td>
                    {project.workers.map((worker) => <tr>{worker}</tr>)}
                </td>
            </tr>
        </tbody>
    )
}

const ProjectDetail = ({projects}) => {
    let { id } = useParams();
    let filtered_items = projects.filter((project) => project.id == id)

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
                    <th>
                        Workers
                    </th>
                </tr>
            </thead>
            {filtered_items.map((project) => <ProjectDetailItem project={project} />)}
        </table>

    )
}

export default ProjectDetail;
