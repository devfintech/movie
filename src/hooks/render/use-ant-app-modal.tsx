import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseOutlined,
  InfoCircleFilled,
  QuestionCircleFilled,
  WarningFilled,
} from "@ant-design/icons"
import { App, Modal, ModalFuncProps } from "antd"
import { ReactNode, useCallback } from "react"
import { Address } from "viem"

import { Button } from "@/libs/ui/button"
import { ExternalLink } from "@/libs/ui/external-link"
import { Loading } from "@/libs/ui/loading"
import { getTxUrl } from "@/utils/web3"

export interface AntAppModalProps {
  message: ReactNode
  title?: ReactNode
  hash?: Address
}

const defaultModalProps: ModalFuncProps = {
  icon: null,
  footer: false,
  maskClosable: true,
  centered: true,
  width: 392,
  className: "ant-app-modal",
  rootClassName: "ant-app-modal-root",
  wrapClassName: "ant-app-modal-wrap",
}

export const useAntAppModal = () => {
  const { modal } = App.useApp()

  const handleDestroyAllModal = () => {
    return Modal.destroyAll()
  }

  const modalConfirm = useCallback(
    ({ onYes, onCancel }: { onYes?(): void; onCancel?(): void } = {}, props?: ModalFuncProps) => {
      const modalResponse = modal.confirm({
        // icon: <QuestionOutlined />,
        content: (
          <div className="w-full p-6">
            <div className="flex items-center justify-center">
              <QuestionCircleFilled className="text-6xl text-slate-500" />
            </div>

            <div className="pb-4">
              <p className="text-center text-xl">Are you sure?</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                className="mt-4"
                type="primary"
                block
                onClick={() => {
                  if (onYes) {
                    onYes()
                  } else {
                    modalResponse.destroy()
                  }
                }}
              >
                OK
              </Button>
              <Button
                className="mt-4"
                type="danger"
                block
                onClick={() => {
                  if (onCancel) {
                    onCancel()
                  } else {
                    modalResponse.destroy()
                  }
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ),
        ...defaultModalProps,
        ...props,
      })

      return modalResponse
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const modalSuccess = useCallback(({ message, title = "Success", hash }: AntAppModalProps, props?: ModalFuncProps) => {
    const modalResponse = modal.success({
      // title: "Success",
      content: (
        <div className="w-full p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">{title}</h3>
            <button className="hover:text-primary-500 text-sm" onClick={() => modalResponse.destroy()}>
              <CloseOutlined className="" />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <CheckCircleFilled className="text-success-500 text-6xl" />
          </div>
          <div className="space-y-2 text-center">
            <div className="text-success-500 text-lg font-medium">{message}</div>

            {hash && (
              <div className="flex justify-center">
                <ExternalLink href={getTxUrl(hash)}>View transaction in explorer</ExternalLink>
              </div>
            )}
            {/* Content */}
          </div>
          <Button className="mt-4" type="primary" block onClick={() => modalResponse.destroy()}>
            OK
          </Button>
        </div>
      ),
      ...defaultModalProps,
      ...props,
    })

    return modalResponse
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const modalPending = useCallback(({ message, title = "Loading", hash }: AntAppModalProps, props?: ModalFuncProps) => {
    const modalResponse = modal.confirm({
      // title: "Pending",
      // icon: <Loading className="my-6 text-6xl" />,
      content: (
        <div className="w-full p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">{title}</h3>
            {/* <button className="hover:text-primary-500 text-sm" onClick={() => modalResponse.destroy()}>
              <CloseOutlined className="" />
            </button> */}
          </div>

          <div className="my-6 flex items-center justify-center">
            <Loading className="text-4xl" />
          </div>

          <div className="text-center">
            {message}
            {/* Content */}
          </div>
          {/* <Button className="mt-4" type="primary" block onClick={() => modalResponse.destroy()}>
            Close
          </Button> */}
        </div>
      ),
      ...defaultModalProps,

      maskClosable: false,
      closable: false,
      keyboard: false,

      ...props,
    })

    return modalResponse
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const modalPendingConfirm = useCallback(
    ({ message, title = "Loading" }: Partial<Omit<AntAppModalProps, "hash">> = {}, props?: ModalFuncProps) => {
      const modalResponse = modal.confirm({
        // title: "Pending",
        // icon: <Loading className="my-6 text-6xl" />,
        content: (
          <div className="w-full p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg">{title}</h3>
              {/* <button className="hover:text-primary-500 text-sm" onClick={() => modalResponse.destroy()}>
              <CloseOutlined className="" />
            </button> */}
            </div>

            <div className="my-6 flex items-center justify-center">
              <Loading className=" text-6xl" />
            </div>

            <div className="space-y-2 text-center">
              {message}
              {/* Content */}
              <p className="text-center text-base font-medium">Confirm this transaction in your wallet</p>
            </div>
            {/* <Button className="mt-4" type="primary" block onClick={() => modalResponse.destroy()}>
            Close
          </Button> */}
          </div>
        ),
        ...defaultModalProps,
        maskClosable: false,
        closable: false,
        keyboard: false,

        ...props,
      })

      return modalResponse
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const modalInfo = useCallback(
    ({ message, title = "Information", hash }: AntAppModalProps, props?: ModalFuncProps) => {
      const modalResponse = modal.info({
        // title: "Information",
        content: (
          <div className="w-full p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg">{title}</h3>
              <button className="hover:text-primary-500 text-sm" onClick={() => modalResponse.destroy()}>
                <CloseOutlined className="" />
              </button>
            </div>

            <div className="flex items-center justify-center">
              <InfoCircleFilled className="text-info-500 text-6xl" />
            </div>

            <div className="text-center">
              {message}
              {/* Content */}
            </div>
            <Button className="mt-4" type="primary" block onClick={() => modalResponse.destroy()}>
              OK
            </Button>
          </div>
        ),
        ...defaultModalProps,
        ...props,
      })

      return modalResponse
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const modalWarning = useCallback(({ message, title = "Warning", hash }: AntAppModalProps, props?: ModalFuncProps) => {
    const modalResponse = modal.warning({
      // title: "Warning",
      content: (
        <div className="w-full p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">{title}</h3>
            <button className="hover:text-primary-500 text-sm" onClick={() => modalResponse.destroy()}>
              <CloseOutlined className="" />
            </button>
          </div>

          <div className="flex items-center justify-center">
            <WarningFilled className="text-warning-500 text-6xl" />
          </div>

          <div className="text-center">
            {message}
            {/* Content */}
          </div>
          <Button className="mt-4" type="primary" block onClick={() => modalResponse.destroy()}>
            OK
          </Button>
        </div>
      ),
      ...defaultModalProps,
      ...props,
    })

    return modalResponse
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const modalError = useCallback(({ message, title = "Error", hash }: AntAppModalProps, props?: ModalFuncProps) => {
    const modalResponse = modal.error({
      // title: "Error",
      content: (
        <div className="w-full p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">{title}</h3>
            <button className="hover:text-primary-500 text-sm" onClick={() => modalResponse.destroy()}>
              <CloseOutlined className="" />
            </button>
          </div>

          <div className="flex items-center justify-center">
            <CloseCircleFilled className="text-error-500 text-6xl" />
          </div>

          <div className="space-y-2 text-center">
            <div className="text-error-500 text-lg font-medium">{message}</div>

            {hash && (
              <div className="flex justify-center">
                <ExternalLink href={getTxUrl(hash)}>View transaction in explorer</ExternalLink>
              </div>
            )}
            {/* Content */}
          </div>
          <Button className="mt-4" type="primary" block onClick={() => modalResponse.destroy()}>
            OK
          </Button>
        </div>
      ),
      ...defaultModalProps,
      ...props,
    })

    return modalResponse
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    modalConfirm,
    modalSuccess,
    modalInfo,
    modalWarning,
    modalError,
    modalPending,
    modalPendingConfirm,
    destroyAllModal: handleDestroyAllModal,
  }
}
