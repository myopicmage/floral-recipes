// import { Link } from "react-router-dom";

import { Flex, Heading } from "@chakra-ui/react";
import { Header } from "../shared";
import { EditProjectComponent } from "./EditProjectComponent";

export const EditProject = () => {
  return (
    <>
      <Header />

      <Flex justify="center" direction="column" align="center">
        <Heading>Edit Project Name & Date</Heading>
        <Flex pt="20px">
          <EditProjectComponent />
        </Flex>
      </Flex>
    </>
  );
};
