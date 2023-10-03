import { Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { ArrangedFlowerRow, Arrangement, Flower } from "src/types";
import { getTotalCost, makeArrangedFlower } from "../helpers";

export type CalculationsProps = {
  arrangement: Arrangement;
  flowers: Flower[];
};

export const Calculations: React.FC<CalculationsProps> = ({
  arrangement,
  flowers,
}) => {
  const flowersInArrangement: ArrangedFlowerRow[] =
    flowers && arrangement?.flowers
      ? arrangement.flowers
          .map((x) => makeArrangedFlower(x, flowers))
          .filter((x): x is ArrangedFlowerRow => !!x)
      : [];

  const totalCost = flowersInArrangement.length
    ? getTotalCost(flowersInArrangement)
    : 0;
  const baseMarkup200 = totalCost * 2;
  const baseMarkup250 = totalCost * 2.5;
  const costAllArrangements = totalCost * arrangement.arrangement_quantity;
  const totalMarkup200 = costAllArrangements * 2;
  const totalMarkup250 = costAllArrangements * 2.5;

  return (
    <Table size="md" variant="unstyled">
      <Tbody>
        <Tr>
          <Th>Arrangement Quantity</Th>
          <Td textAlign="right">{arrangement.arrangement_quantity}</Td>
          <Th>Cost per Arrangement</Th>
          <Td textAlign="right">${totalCost.toFixed(2)}</Td>
          <Th>Total (All Arrangements)</Th>
          <Td textAlign="right">${costAllArrangements.toFixed(2)}</Td>
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
  );
};
