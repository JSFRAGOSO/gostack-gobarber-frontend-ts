import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import background from '../../assets/sign-in-background.png';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="logo" />
      <form>
        <h2>Faça seu logon</h2>
        <Input
          icon={FiMail}
          name="emailinput"
          type="text"
          placeholder="Email"
        />
        <Input
          icon={FiLock}
          type="password"
          name="password"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
        <a href="/">Esqueci minha senha</a>
      </form>

      <a href="/">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default Login;
