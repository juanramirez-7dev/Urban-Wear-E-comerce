import { useCallback, useMemo, useState, type SubmitEvent } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";

export type AuthMode = "login" | "register";

export interface UseAuthPanelResult {
  readonly mode: AuthMode;
  readonly setMode: (mode: AuthMode) => void;
  readonly errorMessage?: string;
  readonly handleLoginSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  readonly handleRegisterSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

export const useAuthPanel = (): UseAuthPanelResult => {
  const [mode, setMode] = useState<AuthMode>("login");
  const { loginMutate, registerMutate } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      if (!email || !password) {
        return;
      }

        loginMutate.mutate({ email, password }, {
          onSuccess: (data) => {
            if (data.rol === "Cliente") {
              navigate("/");
            } else {
              navigate("/admin");
            }
          }
        });
    },
    [loginMutate, navigate]
  );

  const handleRegisterSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");
      const nombre = String(formData.get("nombre") ?? "");
      const telefono = String(formData.get("telefono") ?? "");

      if (!email || !password || !nombre || !telefono) {
        return;
      }

      registerMutate.mutate({ email, password, nombre, telefono }, {
        onSuccess: () => {
          setMode("login");
        }
      });
  
    },
    [registerMutate]
  );

  const errorMessage = useMemo(() => {
    if (mode === "login") {
      return loginMutate.error?.message;
    }

    return registerMutate.error?.message;
  }, [loginMutate.error, mode, registerMutate.error]);

  return {
    mode,
    setMode,
    errorMessage,
    handleLoginSubmit,
    handleRegisterSubmit
  };
};
