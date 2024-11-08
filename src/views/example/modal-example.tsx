import { Button } from "@/libs/ui/button"
import { Modal } from "@/libs/ui/modal"
import { FC, useState } from "react"

interface ModalExampleProps {}

const ModalExample: FC<ModalExampleProps> = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setIsOpenModal(true)}>
        Modal
      </Button>
      <Modal open={isOpenModal} onCancel={() => setIsOpenModal(false)} title="Title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio rerum officiis consequuntur perspiciatis
        sapiente tenetur neque nihil alias ea at ipsa nulla ab, maiores accusamus culpa hic incidunt tempore reiciendis?
      </Modal>
    </>
  )
}

export default ModalExample
