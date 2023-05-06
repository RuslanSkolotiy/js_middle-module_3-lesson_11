import { AppShell } from '@mantine/core';

import { ControlBox, DeleteNoteForm, EditNoteForm, Header, NewNoteForm, Sidebar, Workspace, WorkspacePlug } from './components';

type NotesProps = {
    noWorkspace?: boolean;
}

const Notes: React.FC<NotesProps> = ({ noWorkspace = false }) => {
    return (
        <AppShell
            padding="md"
            navbar={<Sidebar />}
            header={
                <Header />
            }
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {noWorkspace ? <WorkspacePlug /> : <><ControlBox /><Workspace /><EditNoteForm /><DeleteNoteForm /></>}
            <NewNoteForm />
        </AppShell>
    )
}

export default Notes