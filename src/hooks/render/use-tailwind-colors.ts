import { tailwindColors } from ".tailwind/tailwind-colors"
import { useShallow } from "zustand/react/shallow"
import { useAppSettingsStore } from "../stores/use-app-settings-store"

export const useTailwindColors = () => {
  const { theme } = useAppSettingsStore(useShallow((state) => ({ theme: state.theme })))

  return {
    ...tailwindColors,
    current: tailwindColors[theme],
  }
}
