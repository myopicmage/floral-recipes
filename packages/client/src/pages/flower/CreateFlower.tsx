import { Button, Flex, Heading, Box, VStack, ButtonGroup } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { Header, LeftElementTextField, TextField } from "../shared";
import { useAddFlowerMutation } from '../../api';


export const CreateFlower = () => {
  const [addFlower, { isLoading }] = useAddFlowerMutation();
  const navigate = useNavigate();

  const initialValues = {
    flower_name: "",
    stem_price: "",
    // rounded_up: 1,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await addFlower(values);

    if ('error' in response) {
      // handle
    } else {
      navigate('/flowers')
    }
  }
  
  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Formik Settings*/}
      <Flex justify="center" direction="column" align="center">
        <Heading>Add a New Flower</Heading>
        <Flex pt="20px">
          <Formik
            initialValues={initialValues}

            validationSchema={
              Yup.object({
                flower_name: Yup.string()
                  .required("Please enter a flower name"),
                stem_price: Yup.number()
                  .required("Please enter a price"),
                // rounded_up: Yup.number()
              })}

            onSubmit={handleSubmit}
          >
            <Form>
              <Flex align="center">
                <Box>
                  <VStack mx="auto" spacing="5" justifyContent="center" w="350px">

                    <TextField name="flower_name" type="text" placeholder="Name" label="Floral Name" />

                    <LeftElementTextField name="stem_price" type="text" placeholder="0.00" label="Price" element="$" />


                    {/* <TextField name="rounded_up" type="text" placeholder="0" label="Rounded Up" /> */}


                    {/* Buttons */}
                    <ButtonGroup spacing="6">
                      <Link to="/flowers">
                        <Button>Cancel</Button>
                      </Link>
                      <Button type="submit" colorScheme="pink" disabled={isLoading}>
                        Add
                      </Button>

                    </ButtonGroup>
                  </VStack>
                </Box>
              </Flex>
            </Form>
          </Formik>
        </Flex>
      </Flex>
    </>
  );
};
