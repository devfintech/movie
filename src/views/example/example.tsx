import { UserOutlined } from "@ant-design/icons"
// import { tailwindColors } from '@app/ant-provider'
import { tailwindColors } from ".tailwind/tailwind-colors"
import { Container } from "@/components/layouts/container"
import { useIntersectionObserver } from "@/hooks/render/use-intersection-observer"
import { AntImage } from "@/libs/ui/ant-image"
import { Button } from "@/libs/ui/button"
import { Text } from "@/libs/ui/text"
import {
  Avatar,
  Badge,
  Breadcrumb,
  Card,
  Checkbox,
  Collapse,
  Divider,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Segmented,
  Select,
  Slider,
  Space,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  TabsProps,
  Tag,
  Tooltip,
  Transfer,
  Typography,
  message,
  notification,
} from "antd"
import { NotificationPlacement } from "antd/es/notification/interface"
import { SliderMarks } from "antd/es/slider"
import { FC, createContext, useRef, useState } from "react"
import ButtonExample from "./buttons-example"
import CascaderExample from "./cascader-example"
import FormExample from "./form-example"
import ModalExample from "./modal-example"
import { NotificationExample } from "./notification-example"
import { PopExample } from "./pop-example"
import TableExample from "./table-example"
import { ToastExample } from "./toast-example"

interface ExampleProps {}

const Context = createContext({ name: "Default" })

const Example: FC<ExampleProps> = (props) => {
  const [open, setOpen] = useState(false)

  const elementRef = useRef<HTMLDivElement>(null)

  const entry = useIntersectionObserver(elementRef, {})

  const [value, setValue] = useState("")

  const [messageApi, contextHolderMessage] = message.useMessage()
  const [notificationApi, contextHolderNotification] = notification.useNotification({
    stack: {
      threshold: 3,
    },
  })

  const openNotification = (placement: NotificationPlacement) => {
    notificationApi.success({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    })
  }

  const confirm = () => {
    message.info("Clicked on Yes.")
  }

  return (
    <Container size="md" className="flex flex-col gap-4">
      <FormExample />
      <ButtonExample />
      <PopExample />
      <ToastExample />
      <NotificationExample />
      <div className="flex items-center gap-10">
        <AntImage />
        <Typography.Paragraph
          copyable={{
            text: "Text was copied",
            tooltips: ["Click here to copy", "Copied!!"],
          }}
        >
          Copy Text
        </Typography.Paragraph>
      </div>

      <ModalExample />
      <Text className="text-primary-500" variant="h5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati laborum rem consequatur, voluptas hic, optio
        porro consequuntur ratione exercitationem itaque minus. Perferendis dolores deleniti est dicta molestiae tempora
        nihil facilis!
      </Text>
      <div className="text-overflow-1 w-96">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum unde culpa iste quo? Eum nemo, repellat esse
        exercitationem quisquam labore. Ut ullam amet pariatur neque odio corrupti mollitia quod aliquam.
      </div>

      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Button type="primary">Dropdown</Button>
      </Dropdown>
      <Breadcrumb
        items={[
          {
            title: "Home",
          },
          {
            title: <a href="">Application Center</a>,
          },
          {
            title: <a href="">Application List</a>,
          },
          {
            title: "An Application",
          },
        ]}
      />

      <Button
        type="primary"
        onClick={() => {
          messageApi.success("Hello world")
          openNotification("topRight")
        }}
      >
        {contextHolderNotification}
        {contextHolderMessage}
        Show Message
      </Button>

      <Popconfirm
        placement="topLeft"
        title="Hello World"
        description={" Lorem ipsum dolor sit amet consectetur adipisicing elit"}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary">Pop Confirm</Button>
      </Popconfirm>

      <Progress percent={30} />
      <Divider />
      <Divider>Text Content</Divider>
      <Pagination defaultCurrent={6} total={500} />

      <Steps
        current={1}
        items={[
          {
            title: "Finished",
            description: "Description",
          },
          {
            title: "In Progress",
            description: "Description",
            subTitle: "Left 00:00:08",
          },
          {
            title: "Waiting",
            description: "Description",
          },
        ]}
      />

      <CascaderExample />
      <div className="form">
        <Checkbox>Checkbox</Checkbox>

        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 8 }}
          // style={{ maxWidth: 375 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Input.Search addonBefore="Hello" size="large" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>

          <Rate />

          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form>
      </div>
      <Slider range marks={marks} defaultValue={[26, 37]} />
      <div className="">
        <Switch defaultChecked />
      </div>
      <Transfer
        dataSource={mockData}
        titles={["Source", "Target"]}
        targetKeys={initialTargetKeys}
        //   selectedKeys={selectedKeys}
        //   onChange={onChange}
        //   onSelectChange={onSelectChange}
        //   onScroll={onScroll}
        render={(item) => item.title}
      />
      <Avatar size={64} icon={<UserOutlined />} />
      <Badge count={99}>
        <Avatar shape="square" size="large" />
      </Badge>

      <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>

      <Collapse
        defaultActiveKey={["1"]}
        //   onChange={onChange}
      >
        <Collapse.Panel header="This is panel header 1" key="1">
          <p>{" A dog is a type of domesticated animal."}</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 2" key="2">
          <p>{"  Known for its loyalty and faithfulness,"}</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" key="3">
          <p>{"  it can be found as a welcome guest in many households across the world."}</p>
        </Collapse.Panel>
      </Collapse>

      <Popover
        content={
          <div>
            <p>Content</p>
            <p>Content</p>
          </div>
        }
        title="Title"
      >
        <Button type="primary">Hover me</Button>
      </Popover>

      <Segmented options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]} />

      <Statistic title="Active Users" value={112893} />

      <Table dataSource={dataSource} columns={columns} />

      <Tabs defaultActiveKey="1" items={tabItems} />

      <Space size={[0, 8]} wrap>
        <Tag>Tag 1</Tag>
        <Tag>Tag 2</Tag>
        <Tag>Tag 3</Tag>
      </Space>

      <div className="" ref={elementRef}>
        Intersection Observer
      </div>

      <Tooltip title="Thanks for using antd. Have a nice day!">
        <Button>Tooltip</Button>
      </Tooltip>

      <TableExample />
    </Container>
  )
}

interface RecordType {
  key: string
  title: string
  description: string
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
]

const marks: SliderMarks = {
  0: "0°C",
  26: "26°C",
  37: "37°C",
  100: {
    style: {
      color: tailwindColors.dark.red[400],
    },
    label: <strong>100°C</strong>,
  },
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}))

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key)

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
]

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
]

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: `Tab 1`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: "2",
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
]

export default Example
