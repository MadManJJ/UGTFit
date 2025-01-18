import InputField from "../components/InputField";

function LoginPage() {
  return (
    <div className="login-container">
      <h2 className="form-title">Login</h2>
      <form action="#" className="login-form">
        <InputField type="email" placeholder="Email address" icon="mail" />
        <InputField type="password" placeholder="Password" icon="lock" />
        <a href="#" className="forgot-password-link">
          Forgot password?
        </a>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <p className="signup-prompt">
        Don&apos;t have an account?{" "}
        <a href="#" className="signup-link">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
