import { InputNumber } from "@/libs/ui/input"
import { Form } from "antd"
import { FC } from "react"

interface FormExampleProps {}

const FormExample: FC<FormExampleProps> = () => {
  const [form] = Form.useForm()

  return (
    <div>
      <Form form={form} onFinish={console.log} className="">
        <Form.Item
          name="amount"
          rules={[
            {
              async validator(rule, value) {
                if (Number(value) > 1000000) throw new Error("Max amount is 1000000")
              },
            },
          ]}
        >
          <InputNumber max={99999} maxDecimals={0} placeholder="Input Number..." />
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormExample
