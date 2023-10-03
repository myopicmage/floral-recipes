// import { Link } from "react-router-dom";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { TbEdit } from 'react-icons/tb';

export const ProjectCard = () => {
  return (
    <Card maxW="md" maxH="md" m="auto">
      <CardHeader>
        <Flex direction="column" align="center">
          <Heading size="md">Tali & Spock's Wedding</Heading>
          <Text size="sm">02/05/2023</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex align="center" justify="center">
          <Text size="sm">Last Updated 01/19/2023</Text>
        </Flex>
      </CardBody>
      <Divider />
      <CardFooter justify="center" flexWrap="wrap">
        <ButtonGroup spacing="3" size="sm">
          <Button colorScheme="pink" leftIcon={<HiOutlineBookOpen />}>
            View Project
          </Button>
          <Button
            variant="outline"
            colorScheme="pink"
            leftIcon={<TbEdit />}
          >
            Edit Project
          </Button>
          <Button variant="outline" colorScheme="gray">
            Unpin
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
