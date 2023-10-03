import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../shared";
import { ProjectDetailsComponent } from "./ProjectDetailsComponent";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProjectByIdQuery, useGetAllFlowersQuery } from "../../api";


export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/projects');
    return null;
  }

  //loading data
  const { data: project, error, isLoading } = useGetProjectByIdQuery(id);
  const { data: flowers, isLoading: flowersLoading } = useGetAllFlowersQuery();

  if (isLoading || flowersLoading) {
    return (
      <Text>loading...........</Text>
    );
  }

  if (error || !project || !flowers) {
    return (
      <Text>Something went wrong! Please try again later.</Text>
    );
  }

  return (
    <>
      <Header />
      <Flex
        justify="center"
        direction="column"
        align="center"
        pl="80px"
        pr="80px"
      >
        <ProjectDetailsComponent project={project} flowers={flowers} />
      </Flex>
    </>
  );
};
