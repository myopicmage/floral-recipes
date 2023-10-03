// import { Link } from "react-router-dom";

import { Flex, Heading } from "@chakra-ui/react";
import { Header } from "../shared";
import { EditFlowerComponent } from "./EditFlowerComponent";

export const EditFlower = () => {
  return (
    <>
      <Header />

      <Flex justify="center" direction="column" align="center">
        <Heading>Edit Flower</Heading>
        <Flex pt="20px">
          <EditFlowerComponent />
        </Flex>
      </Flex>
    </>
  );
};
