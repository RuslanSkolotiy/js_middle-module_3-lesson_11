import { ActionIcon, Box, CloseButton, Flex, Input, rem } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useNotes } from "../../../../context";


const SearchBox: React.FC = () => {
    const { setShowAddForm, filter, setFilter } = useNotes();
    return (<Box
        sx={(theme) => ({
            paddingBottom: theme.spacing.lg,
            borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        })}
    >
        <Flex justify="space-between" gap="5px">
            <Input
                icon={<IconSearch />}
                placeholder="Search"
                style={{ flex: 1 }}
                rightSection={
                    <CloseButton aria-label="Close modal" onClick={_ => setFilter('')} />
                }
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
            />
            <ActionIcon variant="default" onClick={() => setShowAddForm(true)} size={36}>
                <IconPlus size="1rem" />
            </ActionIcon>
        </Flex>
    </Box>);
}

export default SearchBox;