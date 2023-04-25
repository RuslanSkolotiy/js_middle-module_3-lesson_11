import { Button, Group, Modal } from "@mantine/core";
import { useNotes } from "../../../../context";
import { useNavigate, useParams } from "react-router-dom";

const DeleteNoteForm: React.FC = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { showDeleteForm, setShowDeleteForm, deleteNote, getNote } = useNotes();
    const note = getNote(Number(id));

    const close = (): void => {
        setShowDeleteForm(false);
    }

    const handleDelete = (): void => {
        deleteNote(Number(id), () => {
            close();
            navigate("/notes/");
        });
    }

    return (<Modal opened={showDeleteForm} onClose={close} title="Deleting note">

        Do you really want to delete the "{note?.title}" note
        <Group position="right" mt="xl">
            <Button onClick={handleDelete} variant="outline" color="red">
                Delete
            </Button>
            <Button type="submit" onClick={close} variant="outline" >
                Close
            </Button>
        </Group>
    </Modal>);
}

export default DeleteNoteForm;