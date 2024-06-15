import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { ViewIcon } from '@chakra-ui/icons';
import { fetchCompletedOrders } from '../api';  // Create mock API function
import OrderModal from '../components/OrderModal';
import { useDisclosure } from "@chakra-ui/react";

const CompletedOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure;
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const { data: orders } = useQuery(["completedOrders"], fetchCompletedOrders);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.invoice_no}</Td>
              <Td>{order.customer_profile.name}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                <IconButton
                  icon={<ViewIcon />}
                  onClick={() => handleViewOrder(order)}
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
        readOnly
      />
    </Box>
  );
};

export default CompletedOrders;
