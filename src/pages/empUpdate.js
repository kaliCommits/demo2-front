import { useState, useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Tabs,
  Alert,
  SimpleGrid,
  Select,
  Flex,
  Loader,
  Center,
  Skeleton
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams,Link } from "react-router-dom";
import {
  empSingleAction,
  empUpdateAction,
  currentUserAction,
  clearErrorAction,
} from "../actions/index";
import ServerError from "./serverError";

const EmpUpdate = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const {id} =  useParams();

  const signUpForm = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
    },
    validate: {
      name: (value) => (value == null ? "Name cant be empty" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => (value.length !== 10 ? "Must be 10 digits" : null),
      category: (value) => (value.length <= 0 ? "Cant be empty" : null),
    },
  });

  useEffect(() => {
    dispatch(currentUserAction());
    dispatch(empSingleAction(parseInt(id)));
  }, []);

  useEffect(()=>{
    if(state.employee.data.length>0){
        signUpForm.values.name = state.employee.data[0].name;
        signUpForm.values.email = state.employee.data[0].email;
        signUpForm.values.phone = state.employee.data[0].phone;
        signUpForm.values.category = state.employee.data[0].category;
    }
  },[state.employee]);

  const onSubmitHandler = ({
    name,
    email,
    phone,
    category,
  }) => {
    const validated = signUpForm.validate();
    if (Object.keys(validated.errors).length === 0) {
      dispatch(
        empUpdateAction({
          id:parseInt(id),
          name,
          email,
          phone,
          category,
          navigate,
        })
      );
    }
  };

  // if(state.errors.length > 0){
  //   return(

  //   )
  // }
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
     state.employee.errors.length > 0
   ) {
     return <ServerError />;
   }

   if (state.employee.loading) {
     return <Skeleton height="60%" widht="60%" />;
   }


  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Employee
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Update Employee!
        </Text>

        <form
          onSubmit={signUpForm.onSubmit((values) => onSubmitHandler(values))}
        >
          <SimpleGrid
            cols={2}
            mt="xl"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <TextInput
              label="Name"
              placeholder="Your name"
              name="name"
              variant="filled"
              required
              {...signUpForm.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              name="email"
              variant="filled"
              required
              {...signUpForm.getInputProps("email")}
            />
          </SimpleGrid>

          <TextInput
            label="Phone"
            placeholder="phone"
            mt="md"
            name="phone"
            variant="filled"
            required
            {...signUpForm.getInputProps("phone")}
          />
          
          <Select
            mt="md"
            required
            label="Category"
            name="category"
            placeholder="Pick one"
            data={[
              { value: "officeStaff", label: "Office-staff" },
              { value: "engineer", label: "Engineer" },
              { value: "Contractor", label: "contractor" },
            ]}
            {...signUpForm.getInputProps("category")}
          />

          <Group position="center" mt="xl">
            <Button type="submit" size="md">
              Save!
            </Button>
          </Group>
        </form>
      </Container>
    </>
  );
};

export default EmpUpdate;
