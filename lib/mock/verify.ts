import { BANK_ITEMS } from "@/lib/mock/methods"
import type {
  Environment,
  MethodId,
  ResultField,
  VerificationMethod,
  VerificationOutcome,
  VerificationResult,
} from "@/lib/types"

function digitSum(value: string) {
  return [...value].reduce((sum, char) => sum + (Number(char) || 0), 0)
}

export function resolveOutcome(idSubmitted: string): VerificationOutcome {
  const compact = idSubmitted.replace(/\s+/g, "").toUpperCase()
  if (
    compact.includes("999999999") ||
    compact.endsWith("-9") ||
    compact === "GHA-999999999-9"
  ) {
    return "error"
  }
  if (
    compact.includes("000000000") ||
    compact.endsWith("-0") ||
    compact === "GHA-000000000-0"
  ) {
    return "no_match"
  }
  return "match"
}

function personFromId(idSubmitted: string) {
  const people = [
    {
      fullName: "Ama Serwaa Boateng",
      gender: "Female",
      dob: "12 Mar 1992",
      address: "12 Ring Road Central, Accra",
    },
    {
      fullName: "Kwame Asante Mensah",
      gender: "Male",
      dob: "4 Aug 1988",
      address: "7 Independence Avenue, Accra",
    },
    {
      fullName: "Efua Nyarko",
      gender: "Female",
      dob: "21 Jan 1995",
      address: "15 Kakum Road, Cape Coast",
    },
    {
      fullName: "Kofi Owusu-Ansah",
      gender: "Male",
      dob: "30 Jun 1984",
      address: "3 Airport Residential, Accra",
    },
    {
      fullName: "Abena Darko",
      gender: "Female",
      dob: "9 Nov 1990",
      address: "22 Ahodwo Street, Kumasi",
    },
  ]
  const index = digitSum(idSubmitted) % people.length
  return people[index]
}

function matchFields(
  methodId: MethodId,
  idSubmitted: string,
  bankName: string | null,
  photoName: string | null
): ResultField[] {
  const person = personFromId(idSubmitted)

  if (methodId === "ghana-card-basic") {
    return [
      { label: "Full name", value: person.fullName },
      { label: "Date of birth", value: person.dob },
      { label: "Gender", value: person.gender },
      { label: "Ghana Card number", value: idSubmitted },
    ]
  }

  if (methodId === "ghana-card-linked") {
    return [
      { label: "Full name", value: person.fullName },
      { label: "Ghana Card number", value: idSubmitted },
      { label: "Registered numbers", value: "024 412 3456, 020 889 1022" },
    ]
  }

  if (methodId === "ghana-card-biometrics") {
    const biometricFail =
      (photoName ?? "").toLowerCase().includes("fail") ||
      idSubmitted.toUpperCase().includes("555555555")
    return [
      { label: "Full name", value: person.fullName },
      { label: "Date of birth", value: person.dob },
      { label: "Gender", value: person.gender },
      { label: "Residential address", value: person.address },
      { label: "Photo match", value: biometricFail ? "No match" : "98.4%" },
      { label: "Biometric result", value: biometricFail ? "Fail" : "Pass" },
    ]
  }

  if (methodId === "voter-id") {
    return [
      { label: "Full name", value: person.fullName },
      { label: "Voter ID", value: idSubmitted },
      { label: "Constituency", value: "Ablekuma South" },
      { label: "Polling station", value: "C080201A" },
    ]
  }

  if (methodId === "passport") {
    return [
      { label: "Full name", value: person.fullName },
      { label: "Passport number", value: idSubmitted },
      { label: "Nationality", value: "Ghanaian" },
      { label: "Expiry date", value: "18 Nov 2029" },
    ]
  }

  if (methodId === "bank-account") {
    const bank =
      BANK_ITEMS.find((item) => item.value === bankName)?.label ?? "Bank"
    return [
      { label: "Account name", value: person.fullName },
      { label: "Bank", value: bank },
      { label: "Account number", value: idSubmitted },
      { label: "Account status", value: "Active" },
    ]
  }

  return [
    { label: "Registered name", value: person.fullName },
    { label: "Phone number", value: idSubmitted },
    { label: "Network", value: "MTN Ghana" },
    { label: "ID type on file", value: "Ghana Card" },
  ]
}

function messageFor(outcome: VerificationOutcome) {
  if (outcome === "match") return "A matching record was returned."
  if (outcome === "no_match")
    return "No record matched this ID. The call is still logged."
  return "The verification service did not return a result. Try again."
}

export async function runVerification(input: {
  method: VerificationMethod
  idSubmitted: string
  bankName: string | null
  photoName: string | null
  environment: Environment
}): Promise<VerificationResult> {
  await new Promise((resolve) => setTimeout(resolve, 900))

  const outcome = resolveOutcome(input.idSubmitted)
  const billed =
    input.environment === "sandbox" || outcome === "error"
      ? 0
      : input.method.priceGhs

  return {
    outcome,
    methodId: input.method.id,
    idSubmitted: input.idSubmitted,
    verificationId: `ver_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    costGhs: billed,
    environment: input.environment,
    fields: outcome === "match" ? matchFields(
      input.method.id,
      input.idSubmitted,
      input.bankName,
      input.photoName
    ) : [],
    message: messageFor(outcome),
  }
}
