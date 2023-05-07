import { useState,useEffect } from "react";
import {useDisclosure} from "@mantine/hooks";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Title,
  Alert,
  Container,
  Center,
  Flex,
  Loader,
  MediaQuery,
  Skeleton,
  createStyles
} from "@mantine/core";
import { IconPencil, IconTrash, IconAlertCircle, IconInfoSquareRounded, IconDetails, IconDirections } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ServerError from "./serverError";
import {
  empAllAction,
  currentUserAction,
  clearErrorAction,
} from "../actions/index";

const categoryColor = {
  engineer: "blue",
  contractor: "cyan",
  officestaff: "pink",
};

const styles = createStyles((theme)=>({
  table:{
    backgroundColor:theme.colors.blue[5]
  }
}));

const EmpAll = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {classes,cx} = styles();

  useEffect(() => {
    dispatch(currentUserAction());
    dispatch(empAllAction());
  }, []);

  const rows = state.employee.data.map(emp=>{
    return (
      <tr key={emp.name} style={{ cursor: "pointer"}}>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {emp.name}
            </Text>
          </Group>
        </td>

        <td>
          <Badge
            color={categoryColor[emp.category.toLowerCase()]}
            variant={theme.colorScheme === "dark" ? "light" : "outline"}
          >
            {emp.category}
          </Badge>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {emp.email}
          </Anchor>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {emp.phone}
          </Text>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {emp.salary}
          </Text>
        </td>
        <td>
          <Group spacing={0}>
            <ActionIcon
              onClick={() => navigate(`/dash/admin/emp/${emp.id}/update`)}
            >
              <IconPencil size="1rem" stroke={1.5} />
            </ActionIcon>

            <ActionIcon
              color="teal"
              onClick={() => navigate(`/dash/admin/emp/${emp.id}`)}
            >
              <IconDirections size="1rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash size="1rem" stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

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

  if(state.currentUser.errors.length > 0){
    return (
      <Container>
        <Center>
          <Alert
            icon={<IconAlertCircle size="2rem" />}
            title="Signin!"
            color="red"
          >
            Something went wrong,
            Looks like you are not sign in,sign in again,
            <Link to="/">signin</Link>
          </Alert>
        </Center>
      </Container>
    );
  }

  if(state.employee.errors.length > 0){
    return(
      <ServerError />
    )
  }

  return (
    <>
      <Skeleton visible={state.employee.loading}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Employees
        </Title>
        <ScrollArea mt="md">
          <Table
            verticalSpacing="sm"
            highlightOnHover
            striped
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Category </th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
                <th />
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Skeleton>
    </>
  );
};

export default EmpAll;
