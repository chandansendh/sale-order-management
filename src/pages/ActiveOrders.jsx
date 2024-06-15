import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { fetchActiveOrders, createOrder, updateOrder } from "../api/index"; // Create mock API functions
import OrderModal from "../components/OrderModal";
import { useDisclosure } from "@chakra-ui/react";

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ActiveOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({queryKey:["activeOrders"], queryFn:fetchActiveOrders});
  const createOrderMutation = useMutation({mutationFn: createOrder, 
    onSuccess: () => queryClient.invalidateQueries(["activeOrders"]),
  });
  const updateOrderMutation = useMutation({mutationFn:updateOrder, 
    onSuccess: () => queryClient.invalidateQueries(["activeOrders"]),
  });

  const handleAddOrder = () => {
    setSelectedOrder(null);
    onOpen();
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    onOpen();
  };
  if(isLoading){
    return(<div>Loading....</div>)
  }
  // console.log(orders);

  return (
    <Box>
      <Button leftIcon={<AddIcon />} onClick={handleAddOrder}>
        Sale Order
      </Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Customer</Th>
            <Th>paid</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.invoice_no}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.paid? "Paid" : "Not Paid"}</Td>
              <Td>{formatDate(order.invoice_date)}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEditOrder(order)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <OrderModal
        isOpen={isOpen}
        onClose={onClose}
        order={selectedOrder}
        onSave={(data) => {
          if (selectedOrder) {
            updateOrderMutation.mutate({ id: selectedOrder.id, ...data });
          } else {
            createOrderMutation.mutate(data);
          }
          onClose();
        }}
      />
    </Box>
  );
};

export default ActiveOrders;

