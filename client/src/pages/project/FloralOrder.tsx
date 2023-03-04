import { Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { getOrderSize } from "./helpers";
import type { Arrangement, Flower, Project } from "src/types";

export type FloralOrderProps = {
	project: Project;
	flowers: Flower[];
}

type FloralOrder = {
	id: number;
	name: string;
	quantity: number;
	roundedUp: number;
	pricePerStem: number;
	total: number;
	markedUp: number;
}

export const FloralOrder: React.FC<FloralOrderProps> = ({ project, flowers }) => {
	//shape data
	const flowerOrders: FloralOrder[] = project.arrangements
		.reduce((acc: FloralOrder[], cur: Arrangement) => {
			cur.flowers.forEach(c => {
				const flower = flowers.find((x) => x.id === c.flower_id); // look up the flower

				if (!flower) {
					return;
				}

				const order = acc.find((x) => x.id === c.flower_id); // see if the acc object already has an entry for this flower_id

				const stemPrice = parseFloat(flower.stem_price); // pre-calculate stem price
				const stemQuantity = parseInt(c.stem_quantity, 10);

				if (order) { // if there's an order for cur.flower_id
					order.quantity += stemQuantity * cur.arrangement_quantity;
					order.total = order.quantity * stemPrice;
					order.markedUp = order.total * 2.50;
					order.roundedUp = getOrderSize(order.quantity, flower.rounded_up);
				} else { // make a new order entry
					const rounded = getOrderSize(stemQuantity, flower.rounded_up);

					acc.push({
						id: c.flower_id,
						name: flower.flower_name,
						quantity: stemQuantity * cur.arrangement_quantity,
						roundedUp: rounded,
						pricePerStem: stemPrice,
						total: rounded * stemPrice,
						markedUp: (rounded * stemPrice) * 2.50,
					});
				}
			});

			return acc;
		}, []);

	//calculate totals
	const { total, withMarkup } = flowerOrders.reduce((acc, cur) => {
		acc.total += cur.total;
		acc.withMarkup += cur.markedUp;
		return acc;
	}, { total: 0, withMarkup: 0 });


	return (
		<Flex p="25px" width="100%" m="auto" flexDirection="column">
			<TableContainer whiteSpace="normal" maxW="1080px">
				<Heading size="lg">Floral Order</Heading>

				{/* Floral Order Table */}
				<Table size="lg">
					<Thead>
						<Tr>
							<Th>Item</Th>
							<Th>Stems</Th>
							<Th>Rounded Up</Th>
							<Th>Price per Stem</Th>
							<Th>Total</Th>
							<Th>Marked Up Total</Th>
						</Tr>
					</Thead>

					<Tbody>
						{flowerOrders.map((x, idx) => (
							<FloralOrderItem
								key={idx}
								name={x.name}
								quantity={x.quantity}
								roundedUp={x.roundedUp}
								pricePerStem={x.pricePerStem}
								total={x.total}
								markedUp={x.markedUp}
							/>
						))}
					</Tbody>
				</Table>
			</TableContainer>

			{/* Totals */}
			<Flex justifyContent="right" pr="40px" pt="20px">
				<Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
					Floral Budget: ${total.toFixed(2)}
				</Text>
			</Flex>
			<Flex justifyContent="right" pr="40px" pt="20px">
				<Text fontSize="md" fontWeight="semibold" textTransform="uppercase">
					With Markup: ${withMarkup.toFixed(2)}
				</Text>
			</Flex>
		</Flex>
	);
};

export type FloralOrderItemProps = {
	name: string;
	quantity: number;
	roundedUp: number;
	pricePerStem: number;
	total: number;
	markedUp: number;
}

// Flower rows
const FloralOrderItem: React.FC<FloralOrderItemProps> = ({
	name,
	quantity,
	roundedUp,
	pricePerStem,
	total,
	markedUp,
}) => (
	<Tr>
		<Td textTransform="capitalize">{name}</Td>
		<Td>{quantity}</Td>
		<Td>{roundedUp}</Td>
		<Td>${pricePerStem.toFixed(2)}</Td>
		<Td>${total.toFixed(2)}</Td>
		<Td>${markedUp.toFixed(2)}</Td>
	</Tr>
);
