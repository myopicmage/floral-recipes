import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { array, number, object, string } from "yup";
import type { Arrangement, Flower, Project } from "../../../types";
import { Fragment, useEffect, useState } from "react";
import { EditFlowerTable } from "./EditFlowerTable";
import { TextField } from "../../shared";
import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { SnackbarCloseReason } from "@mui/base/useSnackbar";
import Snackbar from "../../shared/Snackbar";
import { Calculations } from "./Calculations";
import {
  useUpsertArrangementMutation,
  useDeleteArrangementMutation,
  useDeleteArrangedFlowerMutation,
} from "../../../api";

export type ArrangementFormProps = {
  flowers: Flower[];
  project: Project;
};

export type ArrangementFormType = {
  arrangements: Arrangement[];
};

export const ArrangementForm: React.FC<ArrangementFormProps> = ({
  flowers,
  project,
}) => {

  const { id } = useParams();
  const [upsertArrangement, { isLoading: upsertHappening }] =
    useUpsertArrangementMutation();
  const [deleteArrangement, { isLoading: deleteArrangementHappening }] =
    useDeleteArrangementMutation();
  const [deleteArrangedFlower, { isLoading: deleteFlowerHappening }] =
    useDeleteArrangedFlowerMutation();

  const initialValues: ArrangementFormType = {
    arrangements: project?.arrangements ?? [
      {
        arrangement_name: "",
        arrangement_quantity: 0,
        flowers: [
          {
            flower_id: 0,
            stem_quantity: 0,
          },
        ],
      },
    ],
  };

  //snackbar
  const [open, setOpen] = useState(false);
  const handleCloseSnackbar = (_: any, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  //saves (upserts) all arrangements in the project
  const handleSubmit = async (values: ArrangementFormType) => {
    const response = await upsertArrangement({
      id: project?.id,
      arrangements: values.arrangements,
    });

    if ("error" in response) {
    } else {
      handleOpenSnackbar();
    }
  };

  //delete arrangement
  const [confirmDeleteArr, setConfirmDeleteArr] = useState(false);
  const handleDeleteArrangement = async (remove: () => void, id: number) => {
    if (id) {
      const response = await deleteArrangement({
        projectId: project?.id,
        arrangementId: id
      });
    }

    remove();
    handleOpenSnackbar();
    setConfirmDeleteArr(false);
  };

  //deletes arranged flower
  const handleDeleteArrangedFlower = async (remove: () => void, flowerId: number, arrangementId: number) => {
    if (id) {
      const response = await deleteArrangedFlower({
        projectId: project?.id,
        flowerId,
        arrangementId
      });
    }

    remove();
    handleOpenSnackbar();
  };

  return (
    <Box pb="100px" maxW="1400px">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={object({
          arrangements: array(
            object({
              arrangement_name: string().required(
                "Please enter a name for this arrangement."
              ),
              arrangement_quantity: number().required(
                "Please enter the quantity of this arrangement."
              ),
              flowers: array(
                object({
                  flower_id: number().required("Please select a flower."),
                  stem_quantity: number().required(
                    "Please enter the quantity of stems."
                  ),
                })
              ),
            })
          ),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <FieldArray name="arrangements">
              {(arrangementHelpers) => (
                <>
                  {values.arrangements.map((arrangement, index) => (
                    <Fragment key={`arrangement-${index}`}>
                      <Flex flexDirection="column" key={index}>
                        <Flex
                          flexDirection="column"
                          paddingTop="5px"
                          width="300px"
                        >
                          <TextField
                            name={`arrangements.${index}.arrangement_name`}
                            type="text"
                            placeholder="Enter Name"
                            label="Arrangement Name"
                          />
                          <TextField
                            name={`arrangements.${index}.arrangement_quantity`}
                            type="number"
                            placeholder="0"
                            label="Quantity"
                          />
                        </Flex>

                        <EditFlowerTable
                          index={index}
                          flowers={flowers}
                          handleDeleteArrangedFlower={handleDeleteArrangedFlower}
                        />
                      </Flex>

                      <Flex
                        flexDirection="column"
                        alignItems="flex-end"
                        pr="30px"
                        pt="20px"
                      >
                        {/* extract out? */}
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
                              {/* Arrangement Totals */}
                              <AccordionPanel>
                                <Calculations
                                  arrangement={arrangement}
                                  flowers={flowers}
                                />
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        </Flex>
                      </Flex>

                      <Flex
                        paddingTop="20px"
                        paddingBottom="30px"
                        justifyContent="flex-end"
                      >
                        <Flex>
                          {!confirmDeleteArr && (
                            <Button
                              size="sm"
                              colorScheme="red"
                              isLoading={isSubmitting}
                              variant="outline"
                              onClick={() => setConfirmDeleteArr(true)}
                            >
                              <AiOutlineDelete />
                              Delete Arrangement
                            </Button>
                          )}
                          {confirmDeleteArr && (
                            <Button
                              colorScheme="red"
                              isLoading={isSubmitting}
                              variant="outline"
                              onClick={() =>
                                handleDeleteArrangement(
                                  () => arrangementHelpers.remove(index),
                                  arrangement.id
                                )
                              }
                            >
                              <AiOutlineDelete />
                              Confirm Delete
                            </Button>
                          )}
                        </Flex>
                      </Flex>
                    </Fragment>
                  ))}
                  <Flex paddingTop="10px" justifyContent="flex-start">
                    <Button
                      colorScheme="blue"
                      onClick={() =>
                        arrangementHelpers.push({
                          arrangement_name: "",
                          flowers: [{}],
                        })
                      }
                    >
                      + Arrangement
                    </Button>
                  </Flex>
                </>
              )}
            </FieldArray>
            <Box position="fixed" w="100%" bgColor="white" bottom={0} p="10px">
              <Flex justifyContent="flex-end" pr="250px">
                <Button
                  size="lg"
                  colorScheme="teal"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  <AiOutlineSave /> Save Project
                </Button>
              </Flex>
            </Box>
            {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
          </Form>
        )}
      </Formik>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        Success!
      </Snackbar>
    </Box>
  );
};
