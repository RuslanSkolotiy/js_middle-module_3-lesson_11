import { ActionIcon, Box, Center, Flex, SegmentedControl, rem } from "@mantine/core";
import { IconCode, IconColumns2, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useNotes, workspaseModes } from "../../../../context";

const ControlBox: React.FC = () => {
    const { setShowEditForm, setShowDeleteForm, workspaseMode, setWorkspaseMode } = useNotes();

    return (<Box
        sx={(theme) => ({
            paddingBottom: theme.spacing.md,
            borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        })}
    >
        <Flex gap="xs" align="center">
            <div style={{ flex: 1 }}>
                <SegmentedControl
                    value={workspaseMode}
                    onChange={(value) => setWorkspaseMode(value)}
                    data={[
                        {
                            value: workspaseModes.preview,
                            label: (
                                <Center>
                                    <IconEye size="1rem" />
                                    <Box ml={10}>Preview</Box>
                                </Center>
                            ),
                        },
                        {
                            value: workspaseModes.code,
                            label: (
                                <Center>
                                    <IconCode size="1rem" />
                                    <Box ml={10}>Code</Box>
                                </Center>
                            ),
                        },
                        {
                            value: workspaseModes.both,
                            label: (
                                <Center>
                                    <IconColumns2 size="1rem" />
                                    <Box ml={10}>Both</Box>
                                </Center>
                            ),
                        },
                    ]}
                />
            </div>

            <ActionIcon variant="default" onClick={() => setShowEditForm(true)} size={32}>
                <IconEdit size="1rem" />
            </ActionIcon>
            <ActionIcon variant="default" onClick={() => setShowDeleteForm(true)} size={32}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Flex>

    </Box>);
}

export default ControlBox;