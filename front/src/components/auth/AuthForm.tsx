import type { SubmitEvent } from "react";
import { Link } from "react-router";

export interface AuthFieldDefinition {
  readonly name: string;
  readonly label: string;
  readonly type: "email" | "password" | "text";
  readonly placeholder: string;
  readonly autoComplete?: string;
}

export interface AuthFormProps {
  readonly idPrefix: string;
  readonly fields: ReadonlyArray<AuthFieldDefinition>;
  readonly submitLabel: string;
  readonly onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  readonly forgotPasswordLabel?: string;
  readonly forgotPasswordHref?: string;
  readonly showForgotPassword?: boolean;
}

export function AuthForm({
  idPrefix,
  fields,
  submitLabel,
  onSubmit,
  forgotPasswordLabel,
  forgotPasswordHref,
  showForgotPassword = false
}: Readonly<AuthFormProps>) {
  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div className="space-y-6">
        {fields.map((field) => {
          const fieldId = `${idPrefix}-${field.name}`;
          const isPassword = field.type === "password";
          const shouldShowForgot =
            isPassword && showForgotPassword && forgotPasswordLabel;

          return (
            <div key={fieldId} className="relative">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor={fieldId}
                  className="font-label-sm text-label-sm uppercase text-on-surface-variant"
                >
                  {field.label}
                </label>
                {shouldShowForgot ? (
                  <Link
                    className="font-label-sm text-label-sm uppercase text-secondary transition-colors hover:text-primary"
                    to={forgotPasswordHref ?? "/"}
                  >
                    {forgotPasswordLabel}
                  </Link>
                ) : null}
              </div>
              <input
                id={fieldId}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className="w-full border-b border-outline-variant bg-transparent px-0 py-3 text-body-md font-body-md outline-none transition-all focus:border-primary focus:ring-0"
                required
              />
            </div>
          );
        })}
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-all duration-300 hover:opacity-90 active:opacity-70"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
