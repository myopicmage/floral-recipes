import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Flower } from "src/types";

export type FlowerTableItemProps = {
  flower: Flower;
  handleEditFlower: (id: number) => void;
  handleDeleteFlower: (id: number) => void;
  onOpen: () => void;
  setFlowerToDelete: (flowerId: number) => void;
};

export const FlowerTableItem: React.FC<FlowerTableItemProps> = ({
  flower,
  handleDeleteFlower,
  handleEditFlower,
  onOpen,
  setFlowerToDelete,
}) => {
  
  const handelOpenAlert = (flowerId: number) => {
    setFlowerToDelete(flowerId);
    onOpen();
  };

  return (
    <>
      <Tr>
        <Td>{flower.flower_name}</Td>
        <Td>${flower.stem_price}</Td>
        {/* <Td>{flower.rounded_up}</Td> */}
        <Td>
          <Button
            variant="ghost"
            colorScheme="cyan"
            size="sm"
            onClick={() => handleEditFlower(flower.id)}
          >
            Edit
          </Button>
        </Td>
        <Td>
          <Button
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={() => handelOpenAlert(flower.id)}
          >
            Delete
          </Button>
        </Td>
      </Tr>
    </>
  );
};
