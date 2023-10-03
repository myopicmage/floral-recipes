import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { FieldArray, useFormikContext } from "formik";
import { Fragment } from "react";
import type { ArrangementFormType } from "./ArrangementForm";
import type { Flower } from "../../../types";
import { EditFlowerTableRow } from "./EditFlowerTableRow";

export type FlowerTableProps = {
  index: number;
  flowers: Flower[];
  handleDeleteArrangedFlower: (remove: () => void, flowerId: number, arrangementId: number) => void;
};

export const EditFlowerTable: React.FC<FlowerTableProps> = ({
  index,
  flowers,
  handleDeleteArrangedFlower,
}) => {
  const { values } = useFormikContext<ArrangementFormType>();

  return (
    <FieldArray name={`arrangements.${index}.flowers`}>
      {(flowerHelpers) => (
        <Fragment key={`arrangement-${index}`}>
          <TableContainer whiteSpace="normal">
            <Table size="lg" variant="simple">
              <Thead>
                <Tr>
                  <Th>Flower Type</Th>
                  <Th>
                    <Tooltip label="Stems per one arrangement">
                      Stems
                    </Tooltip>
                  </Th>
                  <Th textAlign="right">Price per Stem</Th>
                  {/* <Th textAlign="right">
                    <Tooltip label="The total rounded-up number of stems based on the quantity for one arrangement">
                      Min Order Size
                    </Tooltip>
                  </Th> */}
                  <Th textAlign="right">
                    <Tooltip label="Total cost for the stem order of each flower type">
                      Total
                    </Tooltip>
                  </Th>
                  {/* <Th textAlign="right">
                    <Tooltip label="Total cost for the stem order of each flower type based on the rounded up number of stems">
                      Rounded Up Total
                    </Tooltip>
                  </Th> */}
                  <Th textAlign="right">Markup 200%</Th>
                  <Th textAlign="right">Markup 250%</Th>
                  <Th />
                </Tr>
              </Thead>

              <Tbody>
                {values.arrangements[index].flowers.map((_, flowerIdx) => (
                  <EditFlowerTableRow
                    key={`arrangement-${index}-flower-${flowerIdx}`}
                    arrangementIndex={index}
                    flowerIndex={flowerIdx}
                    flowers={flowers}
                    handleDeleteArrangedFlower={handleDeleteArrangedFlower}
                    remove={flowerHelpers.remove}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex pt="10px" pl="5px">
            <Button
              colorScheme="green"
              variant="outline"
              onClick={() =>
                flowerHelpers.push({
                  flower_id: 0,
                })
              }
            >
              + Flower
            </Button>
          </Flex>
        </Fragment>
      )}
    </FieldArray>
  );
};
