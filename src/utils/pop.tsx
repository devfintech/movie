import { t } from "i18next"
import { ReactNode } from "react"
import { HiExternalLink } from "react-icons/hi"
import { Address, BaseError } from "viem"

import { Button } from "@/libs/ui/button"
import { ExternalLink } from "@/libs/ui/external-link"
import { Loading } from "@/libs/ui/loading"
import { Popper } from "./popper"
import { getTxUrl } from "./web3"

export interface PopProps {
  title?: string | HTMLElement | JQuery
  message?: ReactNode
  description?: ReactNode
  hash?: string | Address
}

export function popPendingConfirm({
  title = t("Confirm"),
  message = t("Waiting for confirmation"),
  description = t("Confirm this transaction in your wallet"),
}: Omit<PopProps, "hash"> = {}) {
  Popper.fire({
    title,
    customClass: {
      icon: "!border-none",
    },
    html: (
      <div className="flex flex-col items-center gap-6">
        <Loading className="text-primary" />
        <div className="text-center text-xl font-bold">{message}</div>
        <div className="text-center text-sm font-semibold">{description}</div>
      </div>
    ),
    showCloseButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  })
}

export function popPending({ title = t("Pending"), message, hash }: PopProps) {
  Popper.fire({
    title,
    customClass: {
      icon: "!border-none",
    },
    html: (
      <div className="flex flex-col items-center gap-6">
        <Loading className="text-primary" />
        {hash && <p className="text-center text-xl font-bold">{t("Transaction is processing")}</p>}
        <div className="text-center text-base font-semibold">{message}</div>
        {hash && (
          <ExternalLink
            href={getTxUrl(hash)}
            className="text-info flex w-full items-center gap-2 text-center text-sm font-semibold "
          >
            <Button type="primary" className="w-full gap-1">
              <p>{t("View transaction")}</p>
              <HiExternalLink />
            </Button>
          </ExternalLink>
        )}
      </div>
    ),
    showCloseButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  })
}

export function popSuccess({ title = t("Success"), message, hash }: PopProps) {
  Popper.fire({
    icon: "success",
    title,
    html: (
      <div className="flex flex-col items-center gap-3">
        <div className="text-center text-xl font-bold">{message}</div>
        {hash && (
          <ExternalLink
            href={getTxUrl(hash)}
            className="text-info hover:text-primary-500 flex items-center gap-2 text-center text-sm font-medium hover:underline"
          >
            <p>{t("View transaction")}</p>
            <HiExternalLink />
          </ExternalLink>
        )}
      </div>
    ),
    showCloseButton: false,
  })
}

export function popError({ title = t("Error"), message, hash }: PopProps) {
  Popper.fire({
    icon: "error",
    title,
    html: (
      <div className="flex flex-col items-center gap-3">
        <div className="text-center text-xl font-bold">{message}</div>
        {hash ? (
          <ExternalLink
            href={getTxUrl(hash)}
            className="text-error flex items-center gap-2 text-center text-xs font-medium hover:underline"
          >
            <p>{t("View transaction")}</p>
            <HiExternalLink />
          </ExternalLink>
        ) : null}
      </div>
    ),
    showCloseButton: false,
    showConfirmButton: false,
    showDenyButton: true,
    denyButtonText: t("Try Again"),
  })
}

export function popWeb3Errors(err: BaseError, defaultMsg: string) {
  popError({ message: err.shortMessage || err?.message || defaultMsg })
}
