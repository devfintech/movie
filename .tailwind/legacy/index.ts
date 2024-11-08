import plugin from "tailwindcss/plugin"
import { button } from "./button"
import { input, inputGroup } from "./input"

export default plugin(({ addComponents }) => {
  addComponents([button, input, inputGroup])
})
