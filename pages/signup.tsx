import AuthGuard from '../components/layouts/auth/AuthGuard';
import SignUpPage from '../components/pages/signup/SignUpPage';
import { AuthFormLayout } from '../features/auth/index';

/**
 * User registration page
 *
 * @return {JSX.Element}
 */
const SignUp = () => (<SignUpPage />);

SignUp.getLayout = (page: React.ReactElement) => (
  <>
    <AuthGuard />
    <AuthFormLayout>{page}</AuthFormLayout>
  </>
);

export default SignUp;
