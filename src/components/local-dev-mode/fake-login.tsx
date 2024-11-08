import { Form } from "antd"
import { FC } from "react"

import { ENV, Env } from "@/configs/env.config"
import { useAuth } from "@/hooks/core/use-auth"
import { useCopyToClipboard } from "@/hooks/render/use-copy-to-clipboard"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { Button } from "@/libs/ui/button"
import { Input } from "@/libs/ui/input"
import { sleep } from "@/utils/promise"

interface FakeLoginProps {}

const FAKE_TOKEN = {
  [Env.development]: "",
  [Env.staging]: "",
  [Env.production]: "",
}

export const FakeLogin: FC<FakeLoginProps> = () => {
  const { token, userInfo, refreshUserInfo, updateUserInfo, setToken } = useUserStore()

  const { logout } = useAuth()

  const [form] = Form.useForm()

  const { copy } = useCopyToClipboard()

  const handleFakeLogin = async () => {
    await sleep(500)

    setToken(FAKE_TOKEN[ENV])
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="middle" type="primary" className="flex-1" async onClick={handleFakeLogin}>
          Fake Login
        </Button>
        <Button
          size="middle"
          type="primary"
          className="flex-1"
          onClick={() => {
            logout()
          }}
        >
          Logout
        </Button>
      </div>
      <Form
        form={form}
        onFinish={async (data) => {
          const token = data.token.trim()

          setToken(token)
        }}
      >
        <Form.Item
          name="token"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            className="w-full text-sm"
            addonAfter={<button type="submit">Save</button>}
            placeholder="Enter your token..."
          />
        </Form.Item>
      </Form>

      {userInfo && (
        <div className="space-y-2 rounded-lg border border-stone-300 p-2">
          <div className="flex items-center justify-between gap-2 text-sm">
            <p className="">User Id: </p>
            <div className="flex items-center gap-4">
              <p className="">{userInfo?.id}</p>
            </div>
          </div>
          {/* <div className="flex items-center justify-between gap-2 text-sm">
    <p className="">Twitter username: </p>
    <p className="">{userInfo?.twitterUsername}</p>
  </div>
  <div className="flex items-center justify-between gap-2 text-sm">
    <p className="">Twitter Id: </p>
    <p className="">{userInfo?.twitterId}</p>
  </div>
  <div className="flex items-center justify-between gap-2 text-sm">
    <p className="">Address: </p>
    <p className="break-all text-right">{userInfo?.address}</p>
  </div>
  <div className="flex items-center justify-between gap-2 text-sm">
    <p className="">Ref code: </p>
    <p className="">{userInfo?.referralCode}</p>
  </div> */}

          <div className="flex items-center justify-between gap-2 text-sm">
            <p className="">Others: </p>

            <div className="flex items-center gap-3">
              <Button
                size="small"
                type="info"
                async
                className="hover:text-primary-500 h-6 rounded-md border p-1 px-2 text-xs"
                onClick={() => {
                  copy(token)
                }}
              >
                Copy Token
              </Button>
              <Button
                size="small"
                type="info"
                async
                className="hover:text-primary-500 h-6 rounded-md border p-1 px-2 text-xs"
                onClick={refreshUserInfo}
              >
                Refresh User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
