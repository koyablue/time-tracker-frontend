// components
import TextInput from '../components/Elements/ReactHookForm/TextInput';
import Button from '../components/Elements/Button/Button';
import { AuthForm, AuthFormContentsWrapper, AuthFormLayout } from '../features/auth/index';

// validations
import { emailRegExp } from '../const/validation/rules/email';
import {
  emailRequired,
  emailInvalid,
  passwordRequired,
} from '../const/validation/messages';

// styles
import { softPetals, vegetation } from '../styles/colors';

type LoginFormValues = {
  email: string
  password: string
};

// TODO: use react query to call the login API
// TODO: create react query base function

const Login = () => {
  // TODO: If the user logged in, redirect to main page

  const onSubmit = () => {
    /* do something */
    // TODO: POST: login API
  };

  // TODO: Set the same password validation as the backend

  return (
    <AuthForm<LoginFormValues>
      onSubmit={onSubmit}
    >
      {({ register, formState }) => (
        <AuthFormContentsWrapper
          button={(
            <Button
              type="submit"
              color={vegetation}
              backgroundColor={softPetals}
              borderColor={vegetation}
            >
              <p>Login</p>
            </Button>
          )}
        >
          <TextInput
            type="text"
            placeholder="example@example.com"
            label="E-mail"
            registration={register('email', {
              required: emailRequired,
              pattern: {
                value: emailRegExp,
                message: emailInvalid,
              },
            })}
            error={formState.errors.email}
          />

          <TextInput
            type="password"
            label="Password"
            registration={register('password', {
              required: passwordRequired,
            })}
            error={formState.errors.password}
          />
        </AuthFormContentsWrapper>
      )}
    </AuthForm>
  );
};

Login.getLayout = (page: React.ReactElement) => (
  <AuthFormLayout>{page}</AuthFormLayout>
);

export default Login;