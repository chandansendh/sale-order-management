import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = ({ username, password }) => {
    login(username, password);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="400px" p="8" boxShadow="lg" borderRadius="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input {...register("username")} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register("password")} />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
