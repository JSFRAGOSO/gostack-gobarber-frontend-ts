import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import { Container, Content, Background, AnimatedContainter } from './styles';

interface SignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInCredentials) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }

        addToast({
          title: 'Falha na autenticação',
          type: 'error',
          description: 'Usuário ou senha não encontrados',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <AnimatedContainter>
        <Content>
          <img src={logo} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Faça seu logon</h2>
            <Input icon={FiMail} name="email" type="text" placeholder="Email" />
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <a href="/">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </Content>
      </AnimatedContainter>
      <Background />
    </Container>
  );
};

export default SignIn;
