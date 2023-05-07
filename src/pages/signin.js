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
    Loader,
    Center,
    Box,
    Flex
  } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signinAction,currentUserAction,clearErrorAction} from "../actions/index";
  
const SignIn = () => {
  const dispatch = useDispatch();
  const state = useSelector(state=>state);
  const [type,setType] = useState("admin");
  const navigate = useNavigate();

  const signInForm = useForm({
    initialValues:{
      name:"",
      password:""
    },
    validate:{
      name:value=>(value==null?"Name cant be empty":null),
      password:value=>(value==null || value.length<8?"password cant be null or atleat have 8 length":null)
    },
  
  });



  useEffect(()=>{
    dispatch(currentUserAction());
    return ()=>{
      dispatch(clearErrorAction());
    }
  },[]);

  const onSubmitHandler = ({name,password})=>{
    const validated = signInForm.validate();
    if(Object.keys(validated.errors).length  === 0){
      dispatch(clearErrorAction());
      dispatch(signinAction({name,password,type,navigate}));
    }
    
  }

  // if(state.errors.length > 0){
  //   return(
  
  //   )
  // }

  if(state.currentUser.loading){
    return (
        <Flex direction="column" align="center" justify="center" sx={{minHeight:"80vh",maxHeight:"90vh"}}>
          <Loader variant="bars" />
        </Flex>
    );
  }

  if(Object.keys(state.currentUser.data).length !== 0){
      navigate("/dash/admin");
      return;
  }

    return (
      <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
  
        <form onSubmit={signInForm.onSubmit(values=>onSubmitHandler(values))}>
          <Paper withBorder shadow="md" px={30} pb={30} mt={30} radius="md">
            <Tabs defaultValue="admin">
              <Tabs.List grow>
                <Tabs.Tab value="admin" sx={{fontWeight:700,fontSize:"1.2rem"}} onClick={e=>setType("admin")}>Admin</Tabs.Tab>
                <Tabs.Tab value="employee" sx={{fontWeight:700,fontSize:"1.2rem"}} onClick={e=>setType("employee")}>Employee</Tabs.Tab>
              </Tabs.List>
            </Tabs>
            <TextInput {...signInForm.getInputProps('name')} label="Name" placeholder="adm1" required mt="md"  />
            <PasswordInput {...signInForm.getInputProps('password')} label="Password" placeholder="Your password" required mt="md" />
            <Group position="apart" mt="lg">
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>

            {state.currentUser.errors.length > 0?
            <Alert icon={<IconAlertCircle size="1rem" />} color="red">
              {state.currentUser.errors.map((err,index)=><Title order={5} align='center' color="red.5" weight={600} key={index}>{err.msg}</Title>)}</Alert>:null}
            
            
            <Button type='submit' fullWidth mt="xl">
              Sign in
            </Button>
            
          </Paper>
        </form>
      </Container>
      </>
    );
  
  }

export default SignIn;