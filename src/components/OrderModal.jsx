import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Checkbox
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderModal = ({ isOpen, onClose, order, onSave, readOnly }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      customer_id: order?.customer_id || "",
      customer_name: order?.customer_name || "",
      items: order?.items || [],
      paid: order?.paid || false,
      invoice_no: order?.invoice_no || "",
      invoice_date: order?.invoice_date || new Date(),
    },
  });

  React.useEffect(() => {
    if (order) {
      reset({
        customer_id: order.customer_id,
        customer_name: order.customer_name,
        items: order.items,
        paid: order.paid,
        invoice_no: order.invoice_no,
        invoice_date: new Date(order.invoice_date),
      });
    } else {
      reset({
        customer_id: "",
        customer_name: "",
        items: [],
        paid: false,
        invoice_no: "",
        invoice_date: new Date(),
      });
    }
  }, [order, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order ? "Edit Order" : "Create Order"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isReadOnly={readOnly}>
                <FormLabel>Customer ID</FormLabel>
                <Controller
                  name="customer_id"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormControl isReadOnly={readOnly}>
                <FormLabel>Customer Name</FormLabel>
                <Controller
                  name="customer_name"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormControl isReadOnly={readOnly}>
                <FormLabel>Invoice No</FormLabel>
                <Controller
                  name="invoice_no"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Paid</FormLabel>
                <Controller
                  name="paid"
                  control={control}
                  render={({ field }) => <Checkbox {...field}>Paid</Checkbox>}
                />
              </FormControl>
              <FormControl isReadOnly={readOnly}>
                <FormLabel>Invoice Date</FormLabel>
                <Controller
                  name="invoice_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="MM/dd/yyyy"
                    />
                  )}
                />
              </FormControl>
            </VStack>
            {!readOnly && (
              <ModalFooter>
                <Button type="submit">Save</Button>
              </ModalFooter>
            )}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
