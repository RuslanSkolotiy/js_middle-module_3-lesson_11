import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useNotes } from "../../../../context";
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";

interface FormValues {
    title: string;
}

const NewNoteForm: React.FC = () => {

    const { showAddForm, setShowAddForm, addNote } = useNotes();
    const navigate = useNavigate();

    const close = (): void => {
        setShowAddForm(false);
    }

    const form = useForm<FormValues>({
        initialValues: {
            title: '',
        },
        validate: {
            title: (value) => value.trim().length ? null : 'Required'
        },
    });

    const handleSubmit = async (values: FormValues): void => {
        const id = await addNote(values.title, '');
        form.clearErrors();
        form.reset();
        close();
        navigate(`/notes/${id}`);
    }

    return (<Modal opened={showAddForm} onClose={close} title="Creating new note">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                data-autofocus
                label="Note title"
                placeholder="Enter new note title"
                {...form.getInputProps('title')}
            />
            <Group position="right" mt="xl">
                <Button type="submit">
                    Create
                </Button>
            </Group>
        </form>
    </Modal>);
}

export default NewNoteForm;