import { ArrangedFlower, ArrangedFlowerRow, Flower } from "src/types";

export const getOrderSize = (numStems: number, minOrderSize: number) =>
  Math.ceil(numStems / minOrderSize) * minOrderSize;

export const getTotalCost = (flowersInArrangement: ArrangedFlowerRow[]) => {
  const costPerArr = flowersInArrangement
    .map((x) => x.base_cost)
    .reduce((acc, cur) => acc + cur);

  return costPerArr;
};

//for EditFlowerTable
export const makeArrangedFlower = (
  flower: ArrangedFlower,
  flowers: Flower[]
): ArrangedFlowerRow | null => {
  const fullFlower = flowers.find((f) => f.id === Number(flower.flower_id));

  if (!fullFlower) {
    return null;
  }

  const stemPrice = parseFloat(fullFlower.stem_price);
  const stemQuantity = parseFloat(flower.stem_quantity);
  // const rounded = getOrderSize(stemQuantity, fullFlower.rounded_up);
  const baseCost = stemPrice * stemQuantity;
  // const roundedCost = rounded * stemPrice;

  return {
    name: fullFlower.flower_name,
    stem_price: stemPrice,
    quantity: stemQuantity,
    // rounded,
    base_cost: baseCost,
    // rounded_cost: roundedCost,
    markup200: baseCost * 2,
    markup250: baseCost * 2.5,
  };
};