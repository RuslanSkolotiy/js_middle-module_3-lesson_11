import { Navbar, ScrollArea } from "@mantine/core";
import { ListNotes, SearchBox } from "..";

const Sidebar: React.FC = () => {
    return <Navbar width={{ base: 300 }} p="xs">
        <Navbar.Section>
            <SearchBox />
        </Navbar.Section>
        <Navbar.Section grow component={ScrollArea}>
            <ListNotes />
        </Navbar.Section>
    </Navbar>
}

export default Sidebar;