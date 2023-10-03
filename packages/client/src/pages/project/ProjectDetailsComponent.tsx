import { Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FloralOrder } from "./FloralOrder";
import { useState } from "react";
import dayjs from "dayjs";
import { Flower, Project } from "src/types";
import { ViewArrangement } from "./Arrangements";

export type ProjectDetailsComponentProps = {
  project: Project;
  flowers: Flower[];
};

export const ProjectDetailsComponent: React.FC<
  ProjectDetailsComponentProps
> = ({ project, flowers }) => {

  //edit project link
  let navigate = useNavigate();

  const handleEditProject = (id: number) => {
    navigate(`/projects/${id}/edit`);
  };

  const handleEditProjectDetails = (id: number) => {
    navigate(`/projects/${id}/details/edit`);
  };

  // const lastUpdated = dayjs(project.last_updated).format("MMMM D, YYYY h:mm A");
  const eventDate = dayjs(project.event_date).format("MMMM D, YYYY");

  return (
    <>
      <Flex flexDirection="column">
        <Flex
          flexDirection="row"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Flex flexDirection="column">
            <Flex paddingBottom="10px">
              <Heading>{project.name}</Heading>
            </Flex>
            <Flex>
              <Text>Event Date: {eventDate}</Text>
            </Flex>
            {/* <Flex>
              <Text>Last Updated: {lastUpdated}</Text>
            </Flex> */}
          </Flex>

          {/* Buttons */}
          <Flex pb="20px" justifyContent="flex-end">
            <ButtonGroup>
              <Link to="/projects">
                <Button>Back</Button>
              </Link>
              <Button
                colorScheme="blue"
                onClick={() => handleEditProjectDetails(project.id)}
              >
                Edit Project
              </Button>
              <Link to="/projects/create">
                <Button colorScheme="teal">Create Project</Button>
              </Link>
            </ButtonGroup>
          </Flex>
        </Flex>

        {/* Floral Order Table */}
        <FloralOrder project={project} flowers={flowers} />

        {/* Arrangements*/}
        <Flex p="25px" flexDirection="column">
          <Flex>
            <Flex pt="20px" flexDirection="column">
              <Flex flexDirection="column">
                {project.arrangements.map((arrangement) => (
                    <ViewArrangement
                      key={arrangement.id}
                      project={project}
                      arrangement={arrangement}
                      flowers={flowers}
                    />
                  ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
