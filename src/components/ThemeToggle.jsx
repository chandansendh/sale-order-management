import { useColorMode, Switch, HStack, Text } from "@chakra-ui/react";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack>
      <Text>{colorMode === "light" ? "Light Mode" : "Dark Mode"}</Text>
      <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
    </HStack>
  );
};

export default ThemeToggle;