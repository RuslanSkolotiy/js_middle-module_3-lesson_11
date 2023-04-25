import { marked } from "marked";
import DOMPurify from "dompurify";
import { Box, SimpleGrid, Textarea, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNotes } from "../../../../context";
import { Notes } from "../../../../database/db"

const Workspace: React.FC = () => {
    const { id } = useParams();
    const { getNote, updateNote, workspaseMode } = useNotes();
    const [value, setValue] = useState<string>('');
    const note: Notes | undefined = getNote(Number(id));

    const marketText: string = marked.parse(value);
    const sanitized: string = DOMPurify.sanitize(marketText);

    useEffect(() => {
        setValue(note?.text || '');
    }, [note]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        updateNote(Number(id), { text: event.target.value });
        setValue(event.target.value);
    }

    return <>
        <SimpleGrid cols={workspaseMode === 'both' ? 2 : 1} spacing={16} >
            {(workspaseMode === 'code' || workspaseMode === 'both') && <Box sx={(theme) => ({
                paddingRight: theme.spacing.lg,
                borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                    }`,
            })}>
                <Textarea
                    placeholder="Write here..."
                    variant="unstyled"
                    minRows={20}
                    autosize
                    value={value} onChange={handleChange}
                />
            </Box>}
            {(workspaseMode === 'preview' || workspaseMode === 'both') && <Box>
                {<div dangerouslySetInnerHTML={{ __html: sanitized }} />}
            </Box>}
        </SimpleGrid>
    </>
}

export default Workspace;