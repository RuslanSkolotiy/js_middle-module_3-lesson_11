import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface NoteLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    to: string;
    active: boolean;
}

const NoteLink: React.FC<NoteLinkProps> = ({ icon, color, label, to, active = false }) => {
    const navigate: NavigateFunction = useNavigate();
    const handleClick = () => {
        navigate(to);
    }

    return (
        <UnstyledButton
            sx={(theme) => {
                const bgColor = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0];
                return {
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                    backgroundColor: active ? bgColor : 'none',
                    '&:hover': {
                        backgroundColor: bgColor,
                    },
                }
            }
            }
            onClick={handleClick}
        >
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    );
}

export default NoteLink;