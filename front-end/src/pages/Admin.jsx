import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import HeaderAdmin from '../components/Header/HeaderAdmin';
import { postNewUser } from '../API/dataBaseCall';

const md5 = require('md5');

export default function Admin() {
  const displayName = localStorage.getItem('user');
  const userName = JSON.parse(displayName);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [role, setRole] = useState('Administrator');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = ({ target }, handle) => {
    const { value } = target;
    handle(value);
  };

  const verifyName = (n) => {
    const minChar = 12;
    if (n.length < minChar) {
      return false;
    }
    return true;
  };
  const verifyUser = (userEmail) => {
    const emailRegex = RegExp(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    );
    if (emailRegex.test(userEmail)) return true;
    return false;
  };
  const verifyPassword = (pass) => {
    const minPass = 6;
    if (pass.length < minPass) return false;
    return true;
  };

  const handleRegister = async () => {
    await postNewUser(userName.token, {
      name,
      email,
      password: md5(password),
      role }).catch(setErrorMessage);
  };

  useEffect(() => {
    if (verifyName(name) && verifyPassword(password) && verifyUser(email)) {
      setDisabled(false);
    }
  }, [name, email, password]);

  return (
    <div>
      <HeaderAdmin name={ userName.name } />
      <form>
        <input
          type="text"
          data-testid="admin_manage__input-name"
          placeholder="Name"
          name="name"
          value={ name }
          onChange={ (e) => handleChange(e, setName) }
        />
        <input
          type="text"
          data-testid="admin_manage__input-email"
          placeholder="Email"
          name="email"
          value={ email }
          onChange={ (e) => handleChange(e, setEmail) }
        />
        <input
          type="password"
          data-testid="admin_manage__input-password"
          placeholder="Senha"
          value={ password }
          onChange={ (e) => handleChange(e, setPassword) }
          name="senha"
        />
        <select
          data-testid="admin_manage__select-role"
          onChange={ (e) => handleChange(e, setRole) }
          value={ role }
        >
          <option value="administrator">Administrador</option>
          <option value="seller">Vendedor</option>
          <option value="customer">Comprador</option>
        </select>
        <button
          type="button"
          disabled={ disabled }
          data-testid="admin_manage__button-register"
          onClick={ () => handleRegister() }
        >
          CADASTRAR
        </button>
      </form>
      {errorMessage && (
        <Alert
          data-testid="admin_manage__element-invalid-register"
          variant="danger"
        >
          Error
        </Alert>
      )}
    </div>
  );
}
