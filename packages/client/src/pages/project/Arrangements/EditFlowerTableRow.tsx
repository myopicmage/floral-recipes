import { Button, Flex, Td, Tr } from "@chakra-ui/react";
import { Dropdown, TextField } from "../../shared";
import type { ArrangedFlower, Flower } from "../../../types";
import { AiOutlineDelete } from "react-icons/ai";
import { FieldArrayRenderProps, useFormikContext } from "formik";
import { ArrangementFormType } from "./ArrangementForm";
import { makeArrangedFlower } from "../helpers";

const renderCalc = (flower: ArrangedFlower, flowers: Flower[]) => {
  if (
    !flower?.flower_id ||
    !flower?.stem_quantity ||
    isNaN(parseInt(flower?.stem_quantity))
  ) {
    return (
      <>
        <Td textAlign="right"> - </Td>
        {/* <Td textAlign="right"> - </Td> */}
        <Td textAlign="right"> - </Td>
        {/* <Td textAlign="right"> - </Td> */}
        <Td textAlign="right"> - </Td>
        <Td textAlign="right"> - </Td>
      </>
    );
  }

  const row = makeArrangedFlower(flower, flowers);

  if (!row) {
    return (
      <>
        <Td textAlign="right"> - </Td>
        {/* <Td textAlign="right"> - </Td> */}
        <Td textAlign="right"> - </Td>
        {/* <Td textAlign="right"> - </Td> */}
        <Td textAlign="right"> - </Td>
        <Td textAlign="right"> - </Td>
      </>
    );
  }

  return (
    <>
      <Td textAlign="right">${row.stem_price.toFixed(2)}</Td>
      {/* <Td textAlign="right">{row.rounded}</Td> */}
      <Td textAlign="right">${row.base_cost.toFixed(2)}</Td>
      {/* <Td textAlign="right">${row.rounded_cost.toFixed(2)}</Td> */}
      <Td textAlign="right">${row.markup200.toFixed(2)}</Td>
      <Td textAlign="right">${row.markup250.toFixed(2)}</Td>
    </>
  );
};

export type EditFlowerTableRowProps = {
  arrangementIndex: number;
  flowerIndex: number;
  flowers: Flower[];
  handleDeleteArrangedFlower: (remove: () => void, flowerId: number, arrangementId: number) => void;
  remove: FieldArrayRenderProps['remove'];
};

export const EditFlowerTableRow: React.FC<EditFlowerTableRowProps> = ({
  arrangementIndex,
  flowerIndex,
  flowers,
  handleDeleteArrangedFlower,
  remove,
}) => {

  const formik = useFormikContext<ArrangementFormType>();
  const prefix = `arrangements.${arrangementIndex}.flowers.${flowerIndex}`;
  const flower =
    formik.values.arrangements[arrangementIndex]?.flowers?.[flowerIndex];
  

  return (
    <Tr>
      <Td>
        <Dropdown name={`${prefix}.flower_id`} placeholder="Flower">
          {flowers.map((flower) => (
            <option value={flower.id} key={flower.id}>
              {flower.flower_name}
            </option>
          ))}
        </Dropdown>
      </Td>
      <Td>
        <TextField name={`${prefix}.stem_quantity`} type="text" label="" />
      </Td>
      {renderCalc(flower, flowers)}
      <Td>
        <Flex justifyContent="space-between" gap=".5rem">
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => handleDeleteArrangedFlower(() => remove(flowerIndex), flower.id, formik.values.arrangements[arrangementIndex].id)}
          >
            {/* flower.id is arranged_flowers.id */}
            <AiOutlineDelete />
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};
