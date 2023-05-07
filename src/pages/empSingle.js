import {useState,useEffect} from "react";
import { useDisclosure } from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Stack,
  Flex,
  ActionIcon,
  rem,
  Title,
  Center,
  Alert,
  Container,
  Loader,
  Modal,
  TextInput,
  Skeleton
} from "@mantine/core";

import {
  IconStar,
  IconMail,
  IconPhone,
  IconAlertCircle
} from "@tabler/icons-react";
import {useDispatch,useSelector} from "react-redux";
import { useParams, Link ,useNavigate} from "react-router-dom";
import {empSalaryUpdate,empSingleAction,currentUserAction,clearErrorAction} from "../actions/index";
import ServerError from "./serverError";


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

const EmpSingle = ()=>{
  console.log("me");
     const { classes, theme } = useStyles();
     const [opened, { open, close }] = useDisclosure(false);
     const {id} = useParams();
     const dispatch = useDispatch();
     const state = useSelector(state=>state);
     const navigate = useNavigate();
     const empSingleForm = useForm({
        initialValues:{
          salary:""
        }
     });

    useEffect(()=>{
        dispatch(currentUserAction());
        dispatch(empSingleAction(id));
    },[]);

    useEffect(()=>{
      if(state.employee.data.length > 0){
        empSingleForm.values.salary = state.employee.data[0].salary;
      }
    },[state.employee]);

    const onSubmitHandler = ({ salary }) => {
      const validated = empSingleForm.validate();
      if (Object.keys(validated.errors).length === 0) {
        dispatch(
          empSalaryUpdate({
            id: parseInt(id),
            salary,
            navigate
          })
        );
      }
    };


    if (state.currentUser.loading) {
      return (
        <Flex
          direction="column"
          align="center"
          justify="center"
          sx={{ minHeight: "80vh", maxHeight: "90vh" }}
        >
          <Loader variant="bars" />
        </Flex>
      );
    }

    if (Object.keys(state.currentUser.data).length === 0) {
      return (
        <Container>
          <Center>
            <Alert
              icon={<IconAlertCircle size="2rem" />}
              title="Signin!"
              color="red"
            >
              Looks like you are not sign in,sign in again,
              <Link to="/">signin</Link>
            </Alert>
          </Center>
        </Container>
      );
    }

    if (state.currentUser.errors.length > 0 || state.employee.errors.length > 0) {
      return (
        <ServerError />
      );
    }

    if(state.employee.loading){
      return(
        <Skeleton height="60%" widht="60%"/>
      )
    }


    return (
      <>
        
          <Modal
            opened={opened}
            size="auto"
            onClose={close}
            title="Update employee"
          >
            <form
              onSubmit={empSingleForm.onSubmit((values) =>
                onSubmitHandler(values)
              )}
            >
              <TextInput
                data-autoFocus
                label="Salary"
                placeholder="salary"
                mt="sm"
                name="salary"
                variant="filled"
                required
                {...empSingleForm.getInputProps("salary")}
              />
              <Flex align="center" justify="end">
                <Button mt="sm" type="submit" onClick={close}>
                  Save!
                </Button>
              </Flex>
            </form>
          </Modal>
          <Card withBorder padding="xl" radius="md" className={classes.card}>
            <Avatar
              size={80}
              radius={80}
              mx="auto"
              color="blue"
              className={classes.avatar}
            >
              <IconStar size="1.5rem" />
            </Avatar>
            <Text ta="center" fz="xl" fw={500} mt="sm">
              {state.employee.data[0].name}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
              {state.employee.data[0].category}
            </Text>

            <Center>
              <Card>
                <Group mt={5}>
                  <ActionIcon color="red">
                    <IconPhone size="3rem" stroke={2} />
                  </ActionIcon>
                  <Text fz="lg" c="dimmed">
                    {state.employee.data[0].phone}
                  </Text>
                </Group>

                <Group mt={5}>
                  <ActionIcon color="red">
                    <IconMail size="3rem" stroke={2} />
                  </ActionIcon>
                  <Text fz="lg" c="dimmed">
                    {state.employee.data[0].email}
                  </Text>
                </Group>
              </Card>
            </Center>

            <Center>
              <Flex direction="row" align="center" justify="space-between">
                <Group mt="md" position="center" spacing={100}>
                  <div>
                    <Text fz="sm" c="dimmed">
                      Salary
                    </Text>
                    <Text fz="lg" fw={500}>
                      {state.employee.data[0].salary}
                    </Text>
                  </div>
                  <div>
                    <Text fz="sm" c="dimmed">
                      Join at
                    </Text>
                    <Text fz="lg" fw={500}>
                      {new Date(
                        state.employee.data[0].createdat
                      ).toDateString()}
                    </Text>
                  </div>
                </Group>
              </Flex>
            </Center>

            <Center>
              <Group>
                <Button
                  radius="md"
                  mt="xl"
                  size="md"
                  onClick={open}
                  color={theme.colorScheme === "dark" ? undefined : "dark"}
                >
                  Update Salary
                </Button>
                <Button
                  radius="md"
                  mt="xl"
                  size="md"
                  color={theme.colorScheme === "dark" ? undefined : "blue"}
                >
                  <Link
                    to={`/dash/admin/emp/${id}/update`}
                    style={{
                      textDecoration: "none",
                      undefined: "none",
                      color: "white",
                    }}
                  >
                    Update Emp
                  </Link>
                </Button>
                <Button
                  radius="md"
                  mt="xl"
                  size="md"
                  color={theme.colorScheme === "dark" ? undefined : "red"}
                >
                  <Link
                    to={`/dash/admin/emp/${id}/salary`}
                    style={{
                      textDecoration: "none",
                      undefined: "none",
                      color: "white",
                    }}
                  >
                    Salary History
                  </Link>
                </Button>
              </Group>
            </Center>
          </Card>
        
      </>
    );
}

export default EmpSingle;