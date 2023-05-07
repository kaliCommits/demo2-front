import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
  Avatar,
  Center,
  Flex,
  Box,
  useMantineTheme,
} from "@mantine/core";
import mockdata from "./mockdata";
import { useState } from "react";
import {
    IconLogout,
    IconSwitchHorizontal,
  } from '@tabler/icons-react';
import {Link} from "react-router-dom"; 


const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.indigo[0],
    color: theme.colors.gray[10],
  },
  link: {
    textDecoration: "none",
    // lineHeight: "1.2rem",
    color: theme.colors.dark[1],
    fontWeight:"bold",
    paddingLeft:"1rem",
    borderRadius:"1rem"
  },
  active:{
    backgroundColor:theme.colors.blue[5],
    color:"white"
  }
}));


const NavBarCus = (props)=>{
    const [active, setActive] = useState('Home');
    const {classes,cx} = useStyles();
    console.log(active)
    const links = mockdata.map((item)=>{
        return (
            <Link
              to={item.link}
              onClick={(event) => {
                setActive(item.label);
              }}
              className={cx(classes.link,{[classes.active]:active === item.label})}
            >
              <Group key={item.label} spacing={10} py="md">
                <item.icon stroke={1.5} />
                <span>{item.label}</span>
              </Group>
            </Link>
        );
    });
    return (
      <Navbar {...props} className={classes.navbar}>
        <Navbar.Section mt="lg">
          <Center>
            <Avatar
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              ta="center"
              alt="no img here"
              color="indigo"
              size="xl"
              radius="xl"
            />
          </Center>
        </Navbar.Section>

        {/* Grow section will takeno all available space that is not taken by first and last sections */}
        <Navbar.Section grow mt="lg">
          <Flex direction="column">{links}</Flex>
        </Navbar.Section>

        {/* Last section with normal height (depends on section content) */}
        <Navbar.Section>Last section</Navbar.Section>
      </Navbar>
    );
};

export default NavBarCus;