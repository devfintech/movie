import { Container } from "@/components/layouts/container"
import { MetaHead } from "@/components/layouts/metahead"
import { ConnectorIds, wallets } from "@/configs/wallets.config"
import { useActive } from "@/hooks/wallet/use-active"
import { Button } from "@/libs/ui/button"
import { useReconnect } from "wagmi"

const TestPage = () => {
  const { connectWallet } = useActive()

  const { reconnect, reconnectAsync } = useReconnect()

  return (
    <>
      <MetaHead title="Test" />
      <div className="">
        <Container>
          <div className="flex items-center gap-3">
            <Button type="primary" onClick={connectWallet}>
              Connect Wallet
            </Button>
            <Button
              type="primary"
              onClick={() => {
                const okxWallet = wallets.find((wallet) => wallet.connectorId === ConnectorIds.OkxWallet)

                const deeplink = okxWallet?.getDeepLink?.("https://app.uniswap.org/")
                console.log("🚀 ~ deeplink:", deeplink)
              }}
            >
              Click Me!
            </Button>
            <Button
              type="primary"
              async
              onClick={async () => {
                try {
                  const connected = await reconnectAsync()
                  console.log("🚀 ~ onClick={ ~ connected:", connected)
                } catch (error) {
                  console.log("🚀 ~ TestPage ~ error:", error)
                }
              }}
            >
              Reconnect
            </Button>

            <Button type="none">Click Me!</Button>
          </div>
        </Container>
      </div>
    </>
  )
}

export default TestPage
