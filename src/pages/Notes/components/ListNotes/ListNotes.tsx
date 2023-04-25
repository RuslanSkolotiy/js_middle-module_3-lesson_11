import { useParams } from "react-router-dom";
import { NoteLink } from "..";
import { useNotes } from "../../../../context/NotesProvider";
import { IconDatabase } from "@tabler/icons-react";
import { Notes } from "../../../../database/db";
import { ReactNode } from "react";

type LinkType = {
    icon: ReactNode;
    color: string;
    label: string;
    id: React.Key
}

const ListNotes: React.FC = () => {
    const { id } = useParams();
  
    const { getFilteredNotes } = useNotes();

    const items = getFilteredNotes();

    const data = items.map((item: Notes): LinkType => {
        return { icon: <IconDatabase size="1rem" />, color: 'blue', label: item.title, id: item.id as React.Key }
    });

    const links = data.map((link: LinkType) => <NoteLink {...link} key={link.id} active={link.id === Number(id)} to={'/notes/' + link.id} />);
    return (<>
        {links}
    </>);
}

export default ListNotes;