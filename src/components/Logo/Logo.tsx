import { ColorScheme } from '@mantine/core';

export default function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
    return (
        <div style={{ fontSize: 24 }}>
            <span style={{ color: (colorScheme === 'dark' ? '#1c7ed6' : '#228be6'), fontWeight: "bold" }}>React</span>
            <span style={{ color: (colorScheme === 'dark' ? '#fff' : '#000'), fontWeight: "bold" }}>Notes</span>
        </div>
    );
}