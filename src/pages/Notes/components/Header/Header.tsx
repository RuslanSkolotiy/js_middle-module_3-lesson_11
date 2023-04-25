import { ActionIcon, Group, Header as MantineHeader, useMantineColorScheme } from "@mantine/core";
import { Logo } from "../../../../components";
import { IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react";
import { useAuth } from "../../../../context";

const Header: React.FC = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { signout } = useAuth();
    return (<MantineHeader height={60}>
        <Group sx={{ height: '100%' }} px={20} position="apart">
            <Logo colorScheme={colorScheme} />
            <Group spacing={5}>
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                </ActionIcon>
                <ActionIcon variant="default" onClick={() => signout()} size={30}>
                    <IconLogout size="1rem" />
                </ActionIcon>
            </Group>
        </Group>
    </MantineHeader>);
}

export default Header;