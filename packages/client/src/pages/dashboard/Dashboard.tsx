import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { BiBook, BiBookAdd } from "react-icons/bi";
import { BsFlower1 } from "react-icons/bs";
import { GiFlowerPot } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Header } from "../shared";
import { PinProjectCard } from "./PinProjectCard";
import { ProjectCard } from "./ProjectCard";

export const Dashboard = () => {
  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Dashboard hero */}
      <Flex direction="column" align="center" m="auto" justify="center">
        <Box pt="200px" pb="50px">
          <Heading>Welcome!</Heading>
        </Box>

        <VStack>
          <ButtonGroup spacing="8" variant="outline" paddingBottom="20px">
            <Link to="/projects/create">
              <Button size="lg" colorScheme="cyan" leftIcon={<BiBookAdd />}>
                Create a Project
              </Button>
            </Link>
            <Link to="/flowers/create">
              <Button size="lg" colorScheme="cyan" leftIcon={<BsFlower1 />}>
                Add New Flower
              </Button>
            </Link>
          </ButtonGroup>
          <ButtonGroup spacing="8" variant="outline">
            <Link to="/projects">
              <Button size="lg" colorScheme="pink" leftIcon={<BiBook />}>
                View Projects
              </Button>
            </Link>
            <Link to="/flowers">
              <Button size="lg" colorScheme="pink" leftIcon={<GiFlowerPot />}>
                View Flowers
              </Button>
            </Link>
          </ButtonGroup>
        </VStack>
      </Flex>

      {/* Pinned Projects */}
      {/* <SimpleGrid columns={3} spacing={10} minChildWidth="400px" p="30px">
        <Box>
          <ProjectCard />
        </Box>
        <Box>
          <ProjectCard />
        </Box>
        <Box>
          <ProjectCard />
        </Box>
        <Box>
          <ProjectCard />
        </Box>
      </SimpleGrid> */}
    </>
  );
};
