import { Button, ButtonGroup, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FloralOrder } from "./FloralOrder";
import dayjs from "dayjs";
import { Flower, Project } from "src/types";
import { ArrangementForm } from "./Arrangements";

export type EditProjectDetailsComponentProps = {
  project: Project;
  flowers: Flower[];
};

export const EditProjectDetailsComponent: React.FC<
  EditProjectDetailsComponentProps
> = ({ project, flowers }) => {
  //edit project link
  let navigate = useNavigate();

  const handleEditProject = (id: number) => {
    navigate(`/projects/${id}/edit`);
  };

  //edit project link
  const handleViewProjectDetails = (id: number) => {
    navigate(`/projects/${id}/details`);
  };

  // const lastUpdated = dayjs(project.last_updated).format("MMMM D, YYYY h:mm A");
	const eventDate = dayjs(project.event_date).format("MMMM D, YYYY");
	
	//for modal
	const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Button
                variant="outline"
                colorScheme="red"
                onClick={onOpen}
              >
                Stop Editing
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={() => handleEditProject(project.id)}
              >
                Edit Name & Date
              </Button>
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
                <ArrangementForm project={project} flowers={flowers} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* Confirm Navigate Away Modal */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quit Editing Project?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to quit? Any unsaved progress will be lost.
          </ModalBody>
          <ModalFooter>
            <Button
							colorScheme="red"
							variant="outline"
              mr={3}
              onClick={() => handleViewProjectDetails(project.id)}
            >
              Stop Editing
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Keep Editing
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
