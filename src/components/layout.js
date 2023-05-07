import {useState} from "react";
import  {AppShell,Text} from "@mantine/core";
import {useRef} from "react";
import NavbarCus from "./navbarcustom";
import HeaderCus from "./HeaderCus";

const Layout = ({comp})=>{
    const [opened,setOpened] = useState(false);
    const navRef = useRef();
    console.log(navRef);
    return (
      <AppShell
        padding="md"
        navbar={
          <NavbarCus
            ref={navRef}
            p="md"
            hiddenBreakpoint="sm"
            width={{ sm: 200, lg: 300 }}
            hidden={!opened}
          ></NavbarCus>
        }
        header={
          <HeaderCus
            opened={opened}
            setOpened={setOpened}
            height={{ base: 50, md: 70 }}
            p="md"
          ></HeaderCus>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <div>{comp}</div>
      </AppShell>
    );   
}

export default Layout;