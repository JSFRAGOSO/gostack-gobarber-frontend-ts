import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';
import { Container, Content, Background, AnimatedContainter } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', { email: data.email });

        addToast({
          type: 'sucess',
          title: 'E-mail de recuperação enviado',
          description:
            'Verifique seu e-mail para ter acesso as instruções de como recuperar sua senha',
        });
        history.push({ pathname: '/' });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }

        addToast({
          title: 'Falha na recuperação de senha',
          type: 'error',
          description: 'Ocorreu um erro ao realizar a recuperação de senha',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <AnimatedContainter>
        <Content>
          <img src={logo} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Recuperar senha</h2>
            <Input icon={FiMail} name="email" type="text" placeholder="Email" />
            <Button loading={!!loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar
          </Link>
        </Content>
      </AnimatedContainter>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
