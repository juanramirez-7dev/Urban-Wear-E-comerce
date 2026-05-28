import { useState } from "react"
import { useNavigate } from "react-router"
import { ForgotPasswordStepOne } from "../components/auth/forgot-password/ForgotPasswordStepOne"
import { ForgotPasswordStepTwo } from "../components/auth/forgot-password/ForgotPasswordStepTwo"
import { ForgotPasswordStepThree } from "../components/auth/forgot-password/ForgotPasswordStepThree"

type RecoveryStep = 1 | 2 | 3

const RECOVERY_EMAIL_STORAGE_KEY = "urban-recovery-email"

const readStoredEmail = () => {
  const storedEmail = localStorage.getItem(RECOVERY_EMAIL_STORAGE_KEY)
  return storedEmail?.trim() ?? ""
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState(() => readStoredEmail())
  const [recoveryToken, setRecoveryToken] = useState("")
  const [currentStep, setCurrentStep] = useState<RecoveryStep>(() =>
    readStoredEmail() ? 2 : 1
  )

  const handleStepOneSuccess = (submittedEmail: string) => {
    setEmail(submittedEmail)
    localStorage.setItem(RECOVERY_EMAIL_STORAGE_KEY, submittedEmail)
    setCurrentStep(2)
  }

  const handleStepTwoBack = () => {
    setCurrentStep(1)
  }

  const handleStepTwoSuccess = (token: string) => {
    setRecoveryToken(token)
    setCurrentStep(3)
  }

  const handleStepThreeSuccess = () => {
    localStorage.removeItem(RECOVERY_EMAIL_STORAGE_KEY)
    navigate("/login")
  }

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <ForgotPasswordStepOne
          initialEmail={email}
          onSuccess={handleStepOneSuccess}
        />
      )
    }

    if (currentStep === 2) {
      if (!email) {
        return (
          <ForgotPasswordStepOne
            initialEmail={email}
            onSuccess={handleStepOneSuccess}
          />
        )
      }

      return (
        <ForgotPasswordStepTwo
          email={email}
          onBack={handleStepTwoBack}
          onSuccess={handleStepTwoSuccess}
        />
      )
    }

    if (!recoveryToken || !email) {
      return (
        <ForgotPasswordStepOne
          initialEmail={email}
          onSuccess={handleStepOneSuccess}
        />
      )
    }

    return (
      <ForgotPasswordStepThree
        recoveryToken={recoveryToken}
        onSuccess={handleStepThreeSuccess}
      />
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-margin-mobile pt-20">
      {renderStep()}
    </main>
  )
}
