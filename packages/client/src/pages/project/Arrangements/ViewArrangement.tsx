import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";
import { useMemo } from "react";
import { ArrangedFlowerRow, Arrangement, Flower, Project } from "src/types";
import { getTotalCost, makeArrangedFlower } from "../helpers";
import { Icon } from "../../shared";

export type ArrangementProps = {
  arrangement: Arrangement;
  project: Project;
  flowers: Flower[];
};

export const ViewArrangement: React.FC<ArrangementProps> = ({
  arrangement,
  flowers,
}) => {

  //shape data
  const flowersInArrangement: ArrangedFlowerRow[] = useMemo(() => {
    if (!flowers) {
      return [];
    }
    return arrangement.flowers
      .map((x) => makeArrangedFlower(x, flowers))
      .filter((x): x is ArrangedFlowerRow => !!x);
  }, [flowers]);

  //for arrangement totals
  const totalCost = getTotalCost(flowersInArrangement);
  const baseMarkup200 = totalCost * 2;
  const baseMarkup250 = totalCost * 2.5;
  const costAllArrangements = totalCost * arrangement.arrangement_quantity;
  const totalMarkup200 = costAllArrangements * 2;
  const totalMarkup250 = costAllArrangements * 2.5;

  return (
    <Box pb="100px">
      <Flex flexDirection="column">
        <Heading size="lg" textTransform="capitalize" mb="20px">
          {arrangement.arrangement_name}
        </Heading>

        {/* Arrangement Table */}
        <TableContainer whiteSpace="normal">
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>Flower Type</Th>
                <Th textAlign="right">Price per Stem</Th>
                <Th textAlign="right">
                  {" "}
                  <Tooltip label="Stems per one arrangement">Stems</Tooltip>
                </Th>
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
                  {" "}
                  <Tooltip label="Total cost for the stem order of each flower type based on the rounded up number of stems">
                    Rounded Up Total
                  </Tooltip>
                </Th> */}
                <Th textAlign="right">Markup 200%</Th>
                <Th textAlign="right">Markup 250%</Th>
              </Tr>
            </Thead>

            <Tbody>
              {flowersInArrangement.map((x, idx) => (
                <Tr key={idx}>
                  <Td textTransform="capitalize">{x.name}</Td>
                  <Td textAlign="right">${x.stem_price.toFixed(2)}</Td>
                  <Td textAlign="right">{x.quantity}</Td>
                  {/* <Td textAlign="right">{x.rounded}</Td> */}
                  <Td textAlign="right">${x.base_cost.toFixed(2)}</Td>
                  {/* <Td textAlign="right">${x.rounded_cost.toFixed(2)}</Td> */}
                  <Td textAlign="right">${x.markup200.toFixed(2)}</Td>
                  <Td textAlign="right">${x.markup250.toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      {/* Totals */}
      <Flex w="100%" justifyContent="right" pr="30px" pt="20px">
        <Flex w="1000px">
          <Accordion allowToggle w="100%">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="right">
                    Arrangement Totals
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Table size="md" variant="unstyled">
                  <Tbody>
                    <Tr>
                      <Th>Arrangement Quantity</Th>
                      <Td textAlign="right">
                        {arrangement.arrangement_quantity}
                      </Td>
                      <Th>Cost per Arrangement</Th>
                      <Td textAlign="right">${totalCost.toFixed(2)}</Td>
                      <Th>Total (All Arrangements)</Th>
                      <Td textAlign="right">
                        ${costAllArrangements.toFixed(2)}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>Arrangement 200% Markup</Th>
                      <Td textAlign="right">${baseMarkup200.toFixed(2)}</Td>
                      <Th>Arrangement 250% Markup</Th>
                      <Td textAlign="right">${baseMarkup250.toFixed(2)}</Td>
                    </Tr>
                    <Tr>
                      <Th>Total 200% Markup</Th>
                      <Td textAlign="right">${totalMarkup200.toFixed(2)}</Td>
                      <Th>Total 250% Markup</Th>
                      <Td textAlign="right">${totalMarkup250.toFixed(2)}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </Box>
  );
};
