import { useAntAppModal } from "@/hooks/render/use-ant-app-modal"
import { Button } from "@/libs/ui/button"
import { sleep } from "@/utils/promise"
import { App, Modal } from "antd"
import { FC } from "react"

interface NotificationExampleProps {}

export const NotificationExample: FC<NotificationExampleProps> = () => {
  const { message, notification } = App.useApp()
  const {
    modalSuccess,
    modalError,
    modalInfo,
    modalWarning,
    modalConfirm,
    modalPending,
    modalPendingConfirm,
    destroyAllModal,
  } = useAntAppModal()

  return (
    <div className="flex flex-col gap-2">
      <h2 className="">Nofitication Example</h2>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="success"
          onClick={() =>
            notification.success({
              message: "Successfully",
              description: "Description",
            })
          }
        >
          Notification Success
        </Button>
        <Button
          type="info"
          onClick={() =>
            notification.info({
              message: "Information",
              description: "Description",
            })
          }
        >
          Notification Info
        </Button>
        <Button
          type="warning"
          onClick={() =>
            notification.warning({
              message: "Warning",
              description: "Description",
            })
          }
        >
          Notification Warning
        </Button>
        <Button
          type="danger"
          onClick={() =>
            notification.error({
              message: "Error",
              description: "Description",
            })
          }
        >
          Notification Error
        </Button>
        <Button type="default" onClick={() => notification.destroy()}>
          Notification destroy
        </Button>
      </div>
      <h2 className="">Message Example</h2>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="success" onClick={() => message.success("Successfully")}>
          Message Success
        </Button>
        <Button type="info" onClick={() => message.info("Information")}>
          Message Info
        </Button>
        <Button type="warning" onClick={() => message.warning("Warning")}>
          Message Warning
        </Button>
        <Button type="danger" onClick={() => message.error("Error")}>
          Message Error
        </Button>
        <Button type="default" onClick={() => message.destroy()}>
          Message destroy
        </Button>
      </div>
      <h2 className="">App Modal</h2>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="success"
          onClick={async () => {
            modalSuccess({ message: "Successfully", hash: "0x...hash" })
          }}
        >
          Modal Success
        </Button>
        <Button
          type="info"
          onClick={() => {
            modalInfo({ message: "" })
          }}
        >
          Modal Info
        </Button>
        <Button
          type="warning"
          onClick={() => {
            modalWarning({ message: "" })
          }}
        >
          Modal Warning
        </Button>
        <Button
          type="danger"
          onClick={() => {
            modalError({ message: "Error", hash: "0xsdfsj" })
          }}
        >
          Modal Error
        </Button>

        <Button
          onClick={() => {
            const modalResponse = modalConfirm({
              onYes() {
                notification.success({
                  message: "Click Yes",
                })
                modalResponse.destroy()
              },
            })
          }}
        >
          Modal Confirm
        </Button>

        <Button
          onClick={async () => {
            const modalResponse = modalPending({ message: "Transaction is processing" })

            await sleep(5000)

            modalResponse.destroy()
          }}
        >
          Modal Loading
        </Button>

        <Button
          onClick={async () => {
            modalPendingConfirm()

            await sleep(5000)

            Modal.destroyAll()

            modalPending({ message: "Proccessing", hash: "0x...." })

            await sleep(5000)

            destroyAllModal()

            modalSuccess({ message: "Successfully" })
          }}
        >
          Modal Pending Confirm
        </Button>
      </div>
    </div>
  )
}
