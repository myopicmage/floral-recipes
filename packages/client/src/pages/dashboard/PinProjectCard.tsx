import { Button, Center, Flex } from "@chakra-ui/react";
import { BsPinAngle } from 'react-icons/bs';

export const PinProjectCard = () => {
  return (
    <Flex justify="center" align="center" p="75px">
      <Center>
        <Button leftIcon={<BsPinAngle />}>Pin Project</Button>
      </Center>
    </Flex>
  );
};
