import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Layout from '../../components/Layout/Layout';

export default function LoginPage({ user, setUser }) {
  return (
      <>
        <LoginForm setUser={setUser} />
      </>
  );
}
