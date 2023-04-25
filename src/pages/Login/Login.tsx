import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { Button, Container, Input } from "@mantine/core";
import { IconAt, IconKey } from "@tabler/icons-react";

const Login: React.FC = () => {
    const { signin, isAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (isAuth) {
        navigate('/notes');
    }

    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        signin(state.email, state.password, () => {
            const from = location.state?.from || "/";
            navigate(from);
        });
    };
    return (
        <Container size="30rem" px={0}>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <Input.Wrapper label="Почта" required maw={320} mx="auto">
                    <Input
                        icon={<IconAt size="0.8rem" />}
                        placeholder="Ваш email"
                        name="email"
                        type="email"
                    />
                </Input.Wrapper>
                <Input.Wrapper label="Пароль" required maw={320} mx="auto">
                    <Input
                        icon={<IconKey size="0.8rem" />}
                        placeholder="Ваш пароль"
                        name="password"
                        type="password"
                    />
                </Input.Wrapper>
                <Input.Wrapper required maw={320} mx="auto" mt={20}>
                    <Button type="submit">Войти</Button>
                </Input.Wrapper>
            </form>
        </Container>
    )
}

export default Login