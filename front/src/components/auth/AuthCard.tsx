import { AuthForm } from "./AuthForm";
import { AuthTabs } from "./AuthTabs";
import { useAuthPanel } from "../../hooks/useAuthPanel";

export function AuthCard() {
  const {
    mode,
    setMode,
    errorMessage,
    handleLoginSubmit,
    handleRegisterSubmit
  } = useAuthPanel();
  const isLogin = mode === "login";

  return (
    <section className="w-full max-w-[440px] border border-outline-variant bg-surface-container-lowest p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:p-12">
      <AuthTabs
        items={[
          { id: "login", label: "Login" },
          { id: "register", label: "Register" }
        ]}
        activeTab={mode}
        onChange={setMode}
      />
      {errorMessage ? (
        <div
          className="mb-6 rounded-lg border border-error bg-error-container px-4 py-3 text-sm text-on-error-container"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}
      <div className="relative min-h-[520px]">
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isLogin
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          aria-hidden={!isLogin}
        >
          <AuthForm
            idPrefix="login"
            fields={[
              {
                name: "email",
                label: "Email Address",
                type: "email",
                placeholder: "name@example.com",
                autoComplete: "email"
              },
              {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "********",
                autoComplete: "current-password"
              }
            ]}
            submitLabel="Sign In"
            onSubmit={handleLoginSubmit}
            showForgotPassword
            forgotPasswordLabel="Forgot Password?"
            forgotPasswordHref="/fotgot-password"
          />
        </div>
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isLogin
              ? "pointer-events-none translate-y-2 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
          aria-hidden={isLogin}
        >
          <AuthForm
            idPrefix="register"
            fields={[
              {
                name: "email",
                label: "Email Address",
                type: "email",
                placeholder: "name@example.com",
                autoComplete: "email"
              },
              {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "********",
                autoComplete: "new-password"
              },
              {
                name: "nombre",
                label: "Nombre",
                type: "text",
                placeholder: "John Doe",
                autoComplete: "My Name"
              },
              {
                name: "telefono",
                label: "Telefono",
                type: "text",
                placeholder: "",
                autoComplete: ""
              }
            ]}
            submitLabel="Create Account"
            onSubmit={handleRegisterSubmit}
          />
        </div>
      </div>
    </section>
  );
}
