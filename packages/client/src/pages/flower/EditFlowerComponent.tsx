import { Box, Button, ButtonGroup, Flex, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useGetFlowerQuery, useUpdateFlowerMutation } from "../../api";
import { LeftElementTextField, TextField } from "../shared";

export const EditFlowerComponent = () => {
  //grab id from url
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: flower, isLoading, error } = useGetFlowerQuery(id ?? "");
  const [updateFlower, { isLoading: updateIsLoading }] =
    useUpdateFlowerMutation();

  const initialValues = {
    flower_name: flower?.flower_name ?? '',
    stem_price: flower?.stem_price ?? '',
    // rounded_up: flower?.rounded_up ?? 0,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await updateFlower({ id: flower?.id, ...values });

    if ('error' in response) {
      // handle
    } else {
      navigate('/flowers')
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        flower_name: Yup.string().required("Please enter a flower name"),
        stem_price: Yup.number()
          .required("Please enter a price only using numbers")
          .typeError("Must be a number"),
        // rounded_up: Yup.number()
        //   .required("Please enter a number")
        //   .typeError("Must be a number"),
      })}
      onSubmit={handleSubmit}
    >
      <Form>
        <Flex align="center">
          <Box>
            <VStack mx="auto" spacing="5" justifyContent="center" w="350px">
              <TextField
                name="flower_name"
                type="text"
                placeholder="Name"
                label="Floral Name"
              />
              <LeftElementTextField
                name="stem_price"
                type="text"
                placeholder="0.00"
                label="Price"
                element="$"
              />
              {/* <TextField
                name="rounded_up"
                type="text"
                placeholder="Rounded Up"
                label="Rounded Up"
              /> */}

              {/* Buttons */}
              <ButtonGroup spacing="6">
                <Link to="/flowers">
                  <Button>Cancel</Button>
                </Link>
                <Button type="submit" colorScheme="pink" disabled={isLoading || updateIsLoading}>
                  Update
                </Button>
              </ButtonGroup>
            </VStack>
          </Box>
        </Flex>
      </Form>
    </Formik>
  );
};
