import React from 'react';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="logo" />
      <form>
        <h2>Faça seu cadastro</h2>
        <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
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
        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="/">
        <FiArrowLeft />
        Voltar para Login
      </a>
    </Content>
  </Container>
);

export default SignUp;
