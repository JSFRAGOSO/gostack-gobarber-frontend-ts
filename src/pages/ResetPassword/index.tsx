import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/Toast';
import { Container, Content, Background, AnimatedContainter } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password_confirmation: string;
  password: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string()
            .required()
            .oneOf(
              [Yup.ref('password'), null],
              'Senha e Confirmação de senha diferem',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        if (!token) throw new Error();

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push({ pathname: '/' });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }

        addToast({
          title: 'Falha no reset de senha',
          type: 'error',
          description:
            'Houve um problema ao resetar sua senha, tente novamente',
        });
      }
    },
    [history, addToast, location.search],
  );

  return (
    <Container>
      <AnimatedContainter>
        <Content>
          <img src={logo} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Redefina sua senha</h2>
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Nova senha"
            />
            <Input
              icon={FiLock}
              type="password"
              name="password_confirmation"
              placeholder="Confirmação de senha"
            />
            <Button type="submit">Resetar</Button>
          </Form>
        </Content>
      </AnimatedContainter>
      <Background />
    </Container>
  );
};

export default ResetPassword;
