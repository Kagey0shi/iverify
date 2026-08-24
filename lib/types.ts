export type Environment = "live" | "sandbox"

export type ApiStatus = "live" | "degraded" | "outage"

export type VerificationOutcome = "match" | "no_match" | "error"

export type MethodId =
  | "ghana-card-basic"
  | "ghana-card-linked"
  | "ghana-card-biometrics"
  | "voter-id"
  | "passport"
  | "bank-account"
  | "phone-number"

export type FieldKey = "idNumber" | "photo" | "accountNumber" | "bankName"

export type VerificationMethod = {
  id: MethodId
  displayName: string
  description: string
  inputLabel: string
  fields: FieldKey[]
  priceGhs: number
}

export type ActivityItem = {
  id: string
  methodId: MethodId
  idSubmitted: string
  outcome: VerificationOutcome
  costGhs: number
  timestamp: string
  environment: Environment
}

export type ResultField = {
  label: string
  value: string
}

export type VerificationResult = {
  outcome: VerificationOutcome
  methodId: MethodId
  idSubmitted: string
  verificationId: string
  timestamp: string
  costGhs: number
  environment: Environment
  fields: ResultField[]
  message: string
}
