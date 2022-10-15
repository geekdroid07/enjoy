import React, { useState } from 'react';
import {
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  FormErrorMessage
} from '@chakra-ui/react';
import { RiEyeCloseLine, RiEye2Line } from 'react-icons/ri';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  auth,
  translateFirebaseErrors,
  firestore
} from 'utilities/firebase.utility';
import { sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { modifyUser } from 'redux/slices/user';
import BonumCoaching from 'assets/images/bonum_logo.png';
import { Image } from '@chakra-ui/react';
import firebaseUser from 'adapters/firebaseUser.adapter';
import displayToast from 'utilities/toast.utility';
import useFetchAndLoad from 'hooks/useFetchAndLoad';
// import { getUser } from 'services/coach.service';

function Login() {
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [IsLogging, setIsLogging] = useState(true);

  const dispatch = useDispatch();
  const { callEndpoint } = useFetchAndLoad();

  const initialValues = () => ({
    email: '',
    password: ''
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Debe ser un correo válido')
      .required('El email es requerido'),
    password: Yup.string().required('La contraseña es requerida')
  });

  // const getUserApi = async (id) => {
  //   try {
  //     const userData = await callEndpoint(getUser(id));
  //     return userData.data;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } =
    useFormik({
      initialValues: initialValues(),
      validationSchema,
      onSubmit: async (formValues) => {
        try {
          setLoading(true);
          if (IsLogging) {
            const { user } = await signInWithEmailAndPassword(
              auth,
              formValues.email.toLowerCase(),
              formValues.password
            );
            // const { data: userData } = await getUserApi(user.uid);
            // const info = await getDoc(doc(firestore, 'users', user.uid));
            // if (!userData || (userData && userData.Role !== 'superadmin')) {
            //   displayToast('No estas autorizado', 'error');
            //   signOut(auth);
            //   return;
            // }

            // dispatch(modifyUser(firebaseUser(user, info.data())));
          } else {
            await sendPasswordResetEmail(auth, formValues.email);
            displayToast(
              'Enviamos un correo con el enlace para que reestablezcas tu contraseña',
              'success'
            );
            setIsLogging(true);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setLoginError(translateFirebaseErrors(error.code));
        }
      }
    });

  return (
    <div className="login-container">
      <Image style={{ marginTop: 100 }} src={BonumCoaching} width={300} />
      <form className="flex justify-center column Login" onSubmit={handleSubmit}>
        <h2>{IsLogging ? 'Login' : 'Olvide mi contraseña'}</h2>
        <FormControl
          className="w-full Login__input"
          isInvalid={errors?.email && touched?.email}
        >
          <FormLabel as="legend" className="Login__input_label">
            Email
          </FormLabel>
          <Input
            name="email"
            className="Login__input_control"
            placeholder="Introduce tu Email"
            autoComplete="username"
            data-test="signin-email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />

          {errors?.email && touched.email ? (
            <FormErrorMessage data-test="email-error" fontSize="lg" color="transparent">
              {errors.email}
            </FormErrorMessage>
          ) : null}
        </FormControl>

        {IsLogging && <FormControl
          className="w-full Login__input"
          isInvalid={(errors?.password && touched?.password) || loginError}
        >
          <FormLabel as="legend" className="Login__input_label">
            Contraseña
          </FormLabel>
          <InputGroup>
            <Input
              name="password"
              className="Login__input_control"
              placeholder="Introduce tu contraseña"
              type={viewPassword ? 'text' : 'password'}
              autoComplete="current-password"
              data-test="signin-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <InputRightElement
              h="100%"
              mr={3}
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? (
                <Icon as={RiEye2Line} color="black" className="Login__icon" />
              ) : (
                <Icon as={RiEyeCloseLine} color="black" className="Login__icon" />
              )}
            </InputRightElement>
          </InputGroup>
          {loginError ? (
            <FormErrorMessage fontSize="lg">{loginError}</FormErrorMessage>
          ) : null}
        </FormControl>}
        <p className="Login__forgot" onClick={() => setIsLogging(x => !x)}>{IsLogging ? 'Olvidate tu contraseña?' : 'La recordaste?'}</p>
        <Button
          className="Button Button--primary"
          disabled={loading}
          isLoading={loading}
          data-test="signin-submit"
          type="submit"
        >
          {IsLogging ? 'Iniciar sesión' : 'Reestablecer contraseña'}
        </Button>
      </form>
    </div>

  );
}

export default Login;
