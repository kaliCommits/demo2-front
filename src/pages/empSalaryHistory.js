import { useState, useEffect } from "react";
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
  ScrollArea,
  Table,
  Skeleton
} from "@mantine/core";

import {
  IconStar,
  IconMail,
  IconPhone,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  empSalaryHistory,
  currentUserAction,
  clearErrorAction,
} from "../actions/index";
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

const EmpSalaryHistory = () => {
  const { classes, theme } = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(currentUserAction());
    dispatch(empSalaryHistory(id));
  }, []);

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
   if (
     state.currentUser.errors.length > 0 ||
     state.employeeHistory.errors.length > 0
   ) {
     return <ServerError />;
   }

  if (state.employeeHistory.loading) {
    return <Skeleton height="60%" widht="60%" />;
  }

  const rows = state.employeeHistory.data.map((emp) => {
    return (
        <tr key={emp.name} sx={{ cursor: "pointer" }}>
          <td>
            <Group spacing="sm">
              <Text fz="sm" fw={500}>
                {emp.salary}
              </Text>
            </Group>
          </td>
          <td>
            <Text fz="sm" c="dimmed">
              {new Date(emp.createdat).toDateString()}
            </Text>
          </td>
        </tr>
    );
  });

  return (
    <>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Salary History
      </Title>
        <ScrollArea mt="md">
          <Table sx={{ minWidth: "70%", maxWidth: "70%" }} verticalSpacing="sm">
            <thead>
              <tr>
                <th>Salary(rupees)</th>
                <th>createdAt</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
    </>
  );
};

export default EmpSalaryHistory;
