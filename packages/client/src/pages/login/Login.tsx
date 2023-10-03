import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { TextField } from "../shared";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../redux';
import { api } from '../../api';

type LoginResult = {
  user: {
    id: string;
    username: string;
  };
  token: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await api.post<LoginResult>("/auth/login", {
      username: values.username,
      password: values.password,
    });

    const relevantData = {
      username: response.data.user.username,
      token: response.data.token,
    };

    dispatch(login(relevantData));

    navigate("/projects");
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb="15px"
        p="25px"
      >
        <Box>
          <Heading size="lg">Envision Floral Recipes</Heading>
        </Box>
      </Flex>

      <Flex justify="center" direction="column" align="center">
        <Heading>Log In</Heading>
        <Flex pt="20px">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              username: Yup.string().required("Please enter your username"),
              password: Yup.string().required("Please enter your password"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <Flex align="center">
                <Box>
                  <VStack
                    mx="auto"
                    spacing="5"
                    justifyContent="center"
                    w="350px"
                  >
                    <TextField
                      name="username"
                      type="text"
                      placeholder="Username"
                      label="Username"
                    />

                    <TextField
                      name="password"
                      type="password"
                      placeholder="Password"
                      label="Password"
                    />

                    {/* Buttons */}
                    <Button type="submit" colorScheme="pink">
                      Log In
                    </Button>
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
