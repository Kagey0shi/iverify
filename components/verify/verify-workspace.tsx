"use client"

import * as React from "react"
import {
  CreditCardIcon,
  FingerprintIcon,
  IdCardIcon,
  PhoneIcon,
  SearchIcon,
  UploadIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { OutcomeBadge } from "@/components/status-badge"
import { useEnvironment } from "@/lib/environment"
import { formatGhs, formatTimestamp, methodName } from "@/lib/format"
import { BANK_ITEMS, METHODS, TEST_IDS } from "@/lib/mock/methods"
import { runVerification } from "@/lib/mock/verify"
import type { VerificationMethod, VerificationResult } from "@/lib/types"
import { cn } from "@/lib/utils"

const MAX_PHOTO_BYTES = 5 * 1024 * 1024

function methodIcon(id: VerificationMethod["id"]) {
  if (id === "phone-number") return PhoneIcon
  if (id === "bank-account") return CreditCardIcon
  if (id === "ghana-card-biometrics") return FingerprintIcon
  return IdCardIcon
}

export function VerifyWorkspace() {
  const { environment } = useEnvironment()
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<string>("ghana-card-basic")
  const [idNumber, setIdNumber] = React.useState("")
  const [accountNumber, setAccountNumber] = React.useState("")
  const [bankName, setBankName] = React.useState<string | null>(null)
  const [photo, setPhoto] = React.useState<File | null>(null)
  const [photoError, setPhotoError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [result, setResult] = React.useState<VerificationResult | null>(null)

  const resultRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({ block: "nearest" })
    }
  }, [result])

  const methods = METHODS.filter((method) => {
    const haystack = `${method.displayName} ${method.description} ${method.inputLabel}`
    return haystack.toLowerCase().includes(query.toLowerCase())
  })

  const selected =
    METHODS.find((method) => method.id === selectedId) ?? METHODS[0]

  function resetForm() {
    setIdNumber("")
    setAccountNumber("")
    setBankName(null)
    setPhoto(null)
    setPhotoError(null)
    setResult(null)
  }

  const submittedValue = selected.fields.includes("accountNumber")
    ? accountNumber
    : idNumber

  const formComplete = selected.fields.every((field) => {
    if (field === "idNumber") return idNumber.trim().length > 0
    if (field === "accountNumber") return accountNumber.trim().length > 0
    if (field === "bankName") return Boolean(bankName)
    if (field === "photo") return Boolean(photo) && !photoError
    return false
  })

  function onPhotoChange(file: File | null) {
    setPhoto(file)
    setPhotoError(null)
    if (!file) return
    const typeOk = file.type === "image/jpeg" || file.type === "image/png"
    if (!typeOk) {
      setPhotoError("Use a JPEG or PNG file.")
      setPhoto(null)
      return
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Photo must be 5MB or smaller.")
      setPhoto(null)
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!formComplete || submitting) return
    setSubmitting(true)
    setResult(null)
    const next = await runVerification({
      method: selected,
      idSubmitted: submittedValue.trim(),
      bankName,
      photoName: photo?.name ?? null,
      environment,
    })
    setResult(next)
    setSubmitting(false)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col gap-4 border-b p-4 lg:w-96 lg:border-r lg:border-b-0">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Ghana
          </p>
          <h1 className="font-heading text-xl font-semibold tracking-tight">
            Verify
          </h1>
        </div>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search methods"
            aria-label="Search verification methods"
          />
        </InputGroup>
        <ScrollArea className="h-[min(420px,50vh)] lg:h-auto lg:flex-1">
          {methods.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No methods match</EmptyTitle>
                <EmptyDescription>
                  Try a different search. SSNIT and Driver&apos;s Licence are
                  not offered in this release.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <ToggleGroup
              value={[selectedId]}
              onValueChange={(value) => {
                if (value[0] && value[0] !== selectedId) {
                  setSelectedId(value[0])
                  resetForm()
                }
              }}
              orientation="vertical"
              variant="outline"
              spacing={2}
              className="w-full"
            >
              {methods.map((method) => {
                const Icon = methodIcon(method.id)
                return (
                  <ToggleGroupItem
                    key={method.id}
                    value={method.id}
                    className="h-auto w-full flex-col items-start gap-2 whitespace-normal py-3 text-left"
                  >
                    <span className="flex w-full items-start justify-between gap-3">
                      <span className="flex items-center gap-2 font-medium">
                        <Icon />
                        {method.displayName}
                      </span>
                      <span className="font-mono text-xs tabular-nums">
                        {formatGhs(method.priceGhs)}
                      </span>
                    </span>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {method.description}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {method.inputLabel}
                    </span>
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
          )}
        </ScrollArea>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col gap-4 p-4 lg:p-6">
        {!selected ? (
          <Empty className="flex-1 border">
            <EmptyHeader>
              <EmptyTitle>Select a method</EmptyTitle>
              <EmptyDescription>
                Choose a Ghana verification type to enter an ID and run a check.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            <div className="scan-bed flex flex-col gap-5 rounded-xl p-5">
              <div className="flex flex-col gap-1">
                <h2 className="font-heading text-lg font-medium">
                  {selected.displayName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selected.description}
                </p>
              </div>

              {environment === "sandbox" ? (
                <Alert>
                  <AlertTitle>Sandbox test IDs</AlertTitle>
                  <AlertDescription>
                    {TEST_IDS.map((item) => item.id).join(" · ")} produce match,
                    no-match, and error. Sandbox calls are not billed.
                  </AlertDescription>
                </Alert>
              ) : null}

              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <FieldGroup>
                  {selected.fields.includes("idNumber") ? (
                    <Field>
                      <FieldLabel htmlFor="id-number">
                        {selected.inputLabel}
                      </FieldLabel>
                      <Input
                        id="id-number"
                        name="idNumber"
                        value={idNumber}
                        onChange={(event) => setIdNumber(event.target.value)}
                        className="font-mono tabular-nums"
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </Field>
                  ) : null}

                  {selected.fields.includes("accountNumber") ? (
                    <Field>
                      <FieldLabel htmlFor="account-number">
                        Account number
                      </FieldLabel>
                      <Input
                        id="account-number"
                        name="accountNumber"
                        value={accountNumber}
                        onChange={(event) =>
                          setAccountNumber(event.target.value)
                        }
                        className="font-mono tabular-nums"
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </Field>
                  ) : null}

                  {selected.fields.includes("bankName") ? (
                    <Field>
                      <FieldLabel htmlFor="bank-name">Bank name</FieldLabel>
                      <Select
                        items={[...BANK_ITEMS]}
                        value={bankName}
                        onValueChange={(value) => {
                          setBankName(typeof value === "string" ? value : null)
                        }}
                      >
                        <SelectTrigger id="bank-name" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {BANK_ITEMS.filter((item) => item.value).map(
                              (item) => (
                                <SelectItem
                                  key={item.value}
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  ) : null}

                  {selected.fields.includes("photo") ? (
                    <Field data-invalid={photoError ? true : undefined}>
                      <FieldLabel htmlFor="photo">Photo</FieldLabel>
                      <Input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/jpeg,image/png"
                        aria-invalid={Boolean(photoError)}
                        onChange={(event) =>
                          onPhotoChange(event.target.files?.[0] ?? null)
                        }
                      />
                      <FieldDescription>
                        JPEG or PNG, 5MB maximum. Required for biometrics.
                      </FieldDescription>
                      {photo ? (
                        <FieldDescription>
                          Selected: {photo.name}
                        </FieldDescription>
                      ) : null}
                      {photoError ? (
                        <FieldError>{photoError}</FieldError>
                      ) : null}
                    </Field>
                  ) : null}
                </FieldGroup>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm">
                    <span className="font-mono tabular-nums">
                      {formatGhs(
                        environment === "sandbox" ? 0 : selected.priceGhs
                      )}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      before you submit
                    </span>
                  </p>
                  <Button type="submit" disabled={!formComplete || submitting}>
                    {submitting ? (
                      <Spinner data-icon="inline-start" />
                    ) : (
                      <UploadIcon data-icon="inline-start" />
                    )}
                    {submitting ? "Verifying" : "Run verification"}
                  </Button>
                </div>
              </form>
            </div>

            {submitting ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Spinner />
                    Checking the register
                  </CardTitle>
                  <CardDescription>
                    Matching {selected.inputLabel.toLowerCase()} against Ghana
                    records.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : null}

            {result ? (
              <div ref={resultRef}>
                <VerifyResultCard result={result} />
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  )
}

function VerifyResultCard({ result }: { result: VerificationResult }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <OutcomeBadge outcome={result.outcome} />
          <Badge variant="outline">
            {result.environment === "live" ? "Live" : "Sandbox"}
          </Badge>
        </div>
        <CardTitle>{methodName(result.methodId)}</CardTitle>
        <CardDescription>{result.message}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {result.outcome === "match" ? (
          <dl className="grid gap-3 sm:grid-cols-2">
            {result.fields.map((field) => (
              <div key={field.label} className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">{field.label}</dt>
                <dd
                  className={cn(
                    "text-sm font-medium",
                    /number|id|phone|account/i.test(field.label)
                      ? "font-mono tabular-nums"
                      : undefined
                  )}
                >
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {result.outcome === "no_match" ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IdCardIcon />
              </EmptyMedia>
              <EmptyTitle>No matching record</EmptyTitle>
              <EmptyDescription>
                This call is still logged to Verification History. Check the ID
                and try again, or use another method.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {result.outcome === "error" ? (
          <Alert variant="destructive">
            <AlertTitle>Verification failed</AlertTitle>
            <AlertDescription>
              No data was returned. The call was not billed.
            </AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-xs text-muted-foreground">
            {result.verificationId}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(result.timestamp)}
          </span>
        </div>
        <Separator orientation="vertical" className="hidden h-8 sm:block" />
        <span className="font-mono text-sm tabular-nums">
          {formatGhs(result.costGhs)}
        </span>
      </CardFooter>
    </Card>
  )
}
