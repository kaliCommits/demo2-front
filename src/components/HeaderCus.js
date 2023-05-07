import {MediaQuery,Burger,Header,Text,Group,Button,createStyles, Avatar} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signOutAction} from "../actions/index";
import {
  IconLogout,
} from "@tabler/icons-react";
const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.indigo[0],
    color: theme.colors.dark[9],
    fontWeight: "bold",
  },
  burger: {
    color: theme.colors.dark[9],
    fontSize: "100rem",
  },
  brandText: {
    color: theme.colors.dark[9],
    letterSpacing: "0.1rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  button: {
    color: {
      backgroundColor: theme.colors.blue[5],
      color: "white",
      fontWeight:"bold"
    },
  },
}));




const HeaderCus = ({height,p,opened,setOpened})=>{
    const {classes,cx} = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
      <Header height={height} width={900000} className={classes.header}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Group>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                mr="xl"
                className={classes.burger}
              />
            </MediaQuery>
            <Avatar
              src="https://images.pexels.com/photos/3095954/pexels-photo-3095954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              ta="center"
              alt="no img here"
              color="indigo"
              size="md"
              radius="xl"
            />
            <Text className={classes.brandText}>Swastik.</Text>
          </Group>
          <Button
            color="red.5"
            radius="lg"
            onClick={()=>dispatch(signOutAction(navigate))}
          >
            <IconLogout stroke={1.5} color="white" />
            <span style={{marginLeft:"0.5rem"}}>SingOut</span>
          </Button>
        </div>
      </Header>
    );
}

export default HeaderCus;