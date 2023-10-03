import {
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BiBookAdd } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../shared";
import { ProjectTableItem } from "./ProjectTableItem";
import { useGetAllProjectsQuery } from "../../api";

export const Projects = () => {
  const navigate = useNavigate();
  const { data: projects, error, isLoading } = useGetAllProjectsQuery();

  //view project link
  const handleDetails = (id: number) => {
    navigate(`/projects/${id}/details`);
  };

  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Title and Search */}
      <Flex m="auto" w="900px" justify="space-between" alignContent="center">
        <Flex pr="20px" mb="40px">
          <Flex mr="20px">
            <Heading>Projects</Heading>
          </Flex>
          {/* <Flex>
            <Input type="text" placeholder="Search" />
            <Button
              colorScheme="pink"
              variant="outline"
              leftIcon={<BiSearchAlt />}
            >
              Search
            </Button>
          </Flex> */}
        </Flex>

        <Flex>
          <Link to="/projects/create">
            <Button
              variant="outline"
              colorScheme="cyan"
              leftIcon={<BiBookAdd />}
            >
              Create Project
            </Button>
          </Link>
        </Flex>
      </Flex>

      {/* Table of Projects */}
      <Flex justify="center">
        {isLoading && "Loading..."}
        {!isLoading && (
          <TableContainer>
            <Table variant="simple" size="lg">
              <Thead>
                <Tr>
                  <Th>Project Name</Th>
                  <Th>Event Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Body */}
                {(projects ?? []).map((project) => (
                  <ProjectTableItem
                    key={project.id}
                    project={project}
                    handleDetails={handleDetails}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Flex>
    </>
  );
};
