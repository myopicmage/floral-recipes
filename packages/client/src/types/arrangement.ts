export type ArrangedFlower = {
  id: number;
  flower_id: number;
  stem_quantity: string;
};

export type Arrangement = {
  id: number;
  arrangement_name: string;
  arrangement_quantity: number;
  flowers: ArrangedFlower[];
};

export type ArrangedFlowerRow = {
  name: string;
  stem_price: number;
  quantity: number;
  // rounded: number;
  base_cost: number;
  // rounded_cost: number;
  markup200: number;
  markup250: number;
};
