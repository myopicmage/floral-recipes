import { Box, Button, ButtonGroup, Flex, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useGetProjectByIdQuery, useUpdateProjectMutation } from "../../api";
import { TextField } from "../shared";

export const EditProjectComponent = () => {
  //grab id from url
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading } = useGetProjectByIdQuery(id ?? '');
  const [updateProject, { isLoading: updateHappening }] = useUpdateProjectMutation();

  const initialValues = {
    project_name: project?.name ?? '',
    event_date: dayjs(project?.event_date).format('YYYY-MM-DD') ?? '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await updateProject({
      id: project?.id,
      event_date: dayjs(values.event_date).toISOString(),
      project_name: values.project_name
    });

    if ('error' in response) {
      //handle
    } else {
      navigate(`/projects/${id}/details`);
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object({
          project_name: Yup.string().required("Please enter a project name"),
          event_date: Yup.date().required("Please enter a date"),
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
                  name="project_name"
                  type="text"
                  label="Project Name"
                />
                <TextField name="event_date" type="date" label="Event Date" />

                {/* Buttons */}
                <ButtonGroup spacing="6">
                  <Link to={`/projects/${id}/details`}>
                    <Button>Cancel</Button>
                  </Link>
                  <Button type="submit" colorScheme="pink">
                    Update
                  </Button>
                </ButtonGroup>
              </VStack>
            </Box>
          </Flex>
        </Form>
      </Formik>
    </>
  );
};
