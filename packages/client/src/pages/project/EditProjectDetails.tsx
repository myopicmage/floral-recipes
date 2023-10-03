import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../shared";
import { useParams } from "react-router-dom";
import { useGetAllFlowersQuery, useGetProjectByIdQuery } from "../../api";
import { EditProjectDetailsComponent } from "./EditProjectDetailsComponent";

export const EditProjectDetails = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  //loading data
  const { data: project, error, isLoading } = useGetProjectByIdQuery(id);
  const { data: flowers, isLoading: flowersLoading } = useGetAllFlowersQuery();

  if (isLoading || flowersLoading) {
    return <Text>loading...........</Text>;
  }

  if (error || !project || !flowers) {
    return <Text>Something went wrong! Please try again later.</Text>;
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
        <EditProjectDetailsComponent project={project} flowers={flowers} />
      </Flex>
    </>
  );
};
