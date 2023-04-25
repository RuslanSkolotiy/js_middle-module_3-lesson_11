import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useNotes } from "../../../../context";
import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

interface FormValues {
    title: string;
}

const EditNoteForm: React.FC = () => {
    const { id } = useParams();
  
    const { showEditForm, setShowEditForm, updateNote, getNote } = useNotes();
    const note = getNote(Number(id));

    const close = (): void => {
        setShowEditForm(false);
    }

    const form = useForm<FormValues>({
        initialValues: {
            title: '',
        },
        validate: {
            title: (value) => value.trim().length ? null : 'Required'
        },
    });
    useEffect(() => {
        form.setValues({ title: note?.title })
    }, [note, showEditForm]);

    const handleSubmit = (values: FormValues): void => {
        updateNote(Number(id), { title: values.title });

        form.clearErrors();
        form.reset();
        close();
    }

    return (<Modal opened={showEditForm} onClose={close} title="Editing note">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                data-autofocus
                label="Note title"
                placeholder="Enter new note title"
                {...form.getInputProps('title')}
            />
            <Group position="right" mt="xl">
                <Button type="submit">
                    Save
                </Button>
            </Group>
        </form>
    </Modal>);
}

export default EditNoteForm;