import * as React from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllFlowersQuery, useDeleteFlowerMutation } from "../../api";
import { Header } from "../shared";
import { FlowerTableItem } from "./FlowerTableItem";
import { useState } from "react";
import { BsFlower1 } from "react-icons/bs";

export const Flowers = () => {
  const navigate = useNavigate();
  const { data: flowers, isLoading } = useGetAllFlowersQuery();
  const [deleteFlower, { isLoading: deleteHappening }] = useDeleteFlowerMutation();

  //delete confirmation modal logic
  const [flowerToDelete, setFlowerToDelete] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //delete a flower
  const handleDeleteFlower = async (id: number) => {
    try {
      const response = await deleteFlower(id);

      if ('error' in response) {
        // handle
      }
    } catch (err) { }

    onClose();
  };

  //edit flower link
  const handleEditFlower = (id: number) => {
    navigate(`/flowers/${id}/edit`);
  };

  return (
    <React.Fragment>
      {/* Navbar */}
      <Header />

      {/* Title and Search */}
      <Flex m="auto" w="900px" justify="space-between" alignContent="center">
        <Flex pr="20px" mb="40px">
          <Flex mr="20px">
            <Heading>Flowers</Heading>
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
          <Link to="/flowers/create">
            <Button
              variant="outline"
              colorScheme="cyan"
              leftIcon={<BsFlower1 />}
            >
              Add Flower
            </Button>
          </Link>
        </Flex>
      </Flex>

      {/* Table of Projects */}
      <Flex justify="center">
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>Flower Name</Th>
                <Th>Price Per Stem</Th>
                {/* <Th>Rounded Up</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {/* Body */}
              {(flowers ?? []).map((flower) => (
                <FlowerTableItem
                  key={flower.id}
                  flower={flower}
                  handleDeleteFlower={handleDeleteFlower}
                  handleEditFlower={handleEditFlower}
                  onOpen={onOpen}
                  setFlowerToDelete={setFlowerToDelete}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      {/* Confirm Delete Modal */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Flower?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this flower? It will be deleted from
            every project in which it appears. This cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleDeleteFlower(flowerToDelete)}
            >
              Delete
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};
