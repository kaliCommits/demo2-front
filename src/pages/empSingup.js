import { useState,useEffect,useRef } from 'react';
import {useForm} from "@mantine/form";
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
    Center
  } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import {useDispatch,useSelector} from "react-redux";
import {useNavigate,Link} from "react-router-dom";
import ServerError from './serverError';
import {empSignUpAction,currentUserAction,clearErrorAction} from "../actions/index";
  
const EmpSignUp = () => {
  const dispatch = useDispatch();
  const state = useSelector(state=>state);
  const navigate = useNavigate();

  const signUpForm = useForm({
    initialValues:{
      name:"",
      password:"",
      email:"",
      phone:"",
      category:"",
      salary:""
    },
    validate:{
      name:value=>(value==null?"Name cant be empty":null),
      password:value=>(value==null || value.length<8?"password cant be null or atleat have 8 length":null),
      email:value=> (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone:value=>(value.length !== 10?"Must be 10 digits":null),
      category:value=>(value.length<=0 ?"Cant be empty":null),
      salary:value=>(value == null ?"cant be empty":null)
    },
  
  });



  useEffect(()=>{
    dispatch(currentUserAction());
  },[]);

  const onSubmitHandler = ({name,password,email,phone,category,salary})=>{
    const validated = signUpForm.validate();
    console.log(name,password,email,phone,category,salary);
    if(Object.keys(validated.errors).length  === 0){
      dispatch(empSignUpAction({name,password,email,phone,category,salary,navigate}));
    }
    
  }

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

    return (
      <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Employee
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          create new Employee!
        </Text>
  
        <form onSubmit={signUpForm.onSubmit(values=>onSubmitHandler(values))}>

            <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                label="Name"
                placeholder="Your name"
                name="name"
                variant="filled"
                required
                {...signUpForm.getInputProps('name')}
                />
                <TextInput
                label="Email"
                placeholder="Your email"
                name="email"
                variant="filled"
                required
                {...signUpForm.getInputProps('email')}
                />
            </SimpleGrid>

            <PasswordInput 
                label="Password" 
                placeholder="password"
                mt="md"  
                name='password'
                variant='filled'
                required 
                {...signUpForm.getInputProps('password')} 
            />

            <TextInput
                label="Phone"
                placeholder="phone"
                mt="md"
                name="phone"
                variant="filled"
                required
                {...signUpForm.getInputProps('phone')}
                />
            <TextInput
                label="Salary"
                placeholder="salary"
                mt="md"
                name="salary"
                variant="filled"
                required
                {...signUpForm.getInputProps('salary')}
            />

            <Select
                mt="md"
                required
                label="Category"
                name='category'
                placeholder="Pick one"
                data={[
                    { value: 'officeStaff', label: 'Office-staff' },
                    { value: 'engineer', label: 'Engineer' },
                    { value: 'Contractor', label: 'contractor' },
                ]}
                {...signUpForm.getInputProps('category')}
            />

            <Group position="center" mt="xl">
                <Button type="submit" size="md">
                Create!
                </Button>
            </Group>
        </form> 
      </Container>
      </>
    );
  
  }

export default EmpSignUp;