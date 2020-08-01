import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';

import { Container, Content, AnimatedContainter, AvatarInput } from './styles';

interface FormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Email obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo Obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo Obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Senha e Confirmação de senha diferem',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        console.log(formData);

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'sucess',
          title: 'Perfil realizado com sucesso!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }

        addToast({
          title: 'Ops!',
          type: 'error',
          description:
            'Ocorreu um erro ao atualizar o perfil, verifique a senha atual',
        });
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();

      e.target.files && data.append('avatar', e.target.files[0]);

      const response = await api.patch<User>('/users/avatar', data);
      addToast({
        type: 'sucess',
        title: 'Avatar Atualizado!',
      });

      updateUser(response.data);
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <AnimatedContainter>
        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>
            <h1>Meu Perfil</h1>
            <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
            <Input icon={FiMail} name="email" type="text" placeholder="Email" />
            <Input
              containerStyle={{ marginTop: 40 }}
              icon={FiLock}
              type="password"
              name="old_password"
              placeholder="Senha atual"
            />
            <Input
              icon={FiLock}
              type="password"
              name="password"
              placeholder="Nova Senha"
            />
            <Input
              icon={FiLock}
              type="password"
              name="password_confirmation"
              placeholder="Confirmar nova Senha"
            />
            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </Content>
      </AnimatedContainter>
    </Container>
  );
};

export default SignUp;
