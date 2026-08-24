import type { VerificationMethod } from "@/lib/types"

export const METHODS: VerificationMethod[] = [
  {
    id: "ghana-card-basic",
    displayName: "Ghana Card — Basic KYC",
    description: "Confirm name and date of birth against the national ID.",
    inputLabel: "Ghana Card number",
    fields: ["idNumber"],
    priceGhs: 1.5,
  },
  {
    id: "ghana-card-linked",
    displayName: "Ghana Card — With Linked Numbers",
    description: "Returns the registered name plus linked phone numbers.",
    inputLabel: "Ghana Card number",
    fields: ["idNumber"],
    priceGhs: 2.5,
  },
  {
    id: "ghana-card-biometrics",
    displayName: "Ghana Card — Full Details + Biometrics",
    description: "Full biodata with a photo match against the national record.",
    inputLabel: "Ghana Card number",
    fields: ["idNumber", "photo"],
    priceGhs: 5,
  },
  {
    id: "voter-id",
    displayName: "Voter ID",
    description: "Match a voter ID number to the electoral register.",
    inputLabel: "Voter ID number",
    fields: ["idNumber"],
    priceGhs: 1.5,
  },
  {
    id: "passport",
    displayName: "Passport",
    description: "Confirm a Ghanaian passport number and holder details.",
    inputLabel: "Passport number",
    fields: ["idNumber"],
    priceGhs: 2,
  },
  {
    id: "bank-account",
    displayName: "Bank Account",
    description: "Name enquiry on a Ghanaian bank account.",
    inputLabel: "Account number",
    fields: ["accountNumber", "bankName"],
    priceGhs: 1,
  },
  {
    id: "phone-number",
    displayName: "Phone Number",
    description: "Look up the registered name on a mobile number.",
    inputLabel: "Phone number",
    fields: ["idNumber"],
    priceGhs: 0.8,
  },
]

export const BANK_ITEMS = [
  { label: "Select a bank", value: null },
  { label: "Absa Bank Ghana", value: "absa" },
  { label: "Access Bank Ghana", value: "access" },
  { label: "CalBank", value: "calbank" },
  { label: "Ecobank Ghana", value: "ecobank" },
  { label: "Fidelity Bank", value: "fidelity" },
  { label: "GCB Bank", value: "gcb" },
  { label: "Stanbic Bank Ghana", value: "stanbic" },
  { label: "UBA Ghana", value: "uba" },
] as const

export const TEST_IDS = [
  { id: "GHA-291847365-1", result: "Match found" },
  { id: "GHA-000000000-0", result: "No match" },
  { id: "GHA-999999999-9", result: "Error" },
] as const
