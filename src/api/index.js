const mockActiveOrders = [
  {
    id: 1,
    customer_id: 11908,
    customer_name: "Ram",
    customer_profile: {
      id: 11908,
      color: [182, 73, 99],
      email: "jesus_christ@church.com",
      pincode: "Mumbai",
      location_name: "Mumbai, Maharashtra, India",
      type: "C",
      profile_pic: null,
      gst: "",
    },
    items: [
      {
        sku_id: 248,
        price: 54,
        quantity: 1,
      },
    ],
    paid: false,
    invoice_no: "1212121",
    invoice_date: "7/5/2024",
  },
];

const mockCompletedOrders = [
  {
    id: 2,
    customer_id: 11909,
    customer_profile: {
      id: 11909,
      name: "Shyam",
      color: [182, 73, 99],
      email: "shyam_kumar@company.com",
      pincode: "Delhi",
      location_name: "Delhi, India",
      type: "B",
      profile_pic: null,
      gst: "",
    },
    items: [
      {
        sku_id: 246,
        price: 23,
        quantity: 2,
      },
    ],
    paid: true,
    invoice_no: "1212122",
    invoice_date: "6/5/2024",
  },
];


export const fetchActiveOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockActiveOrders);
    }, 500);
  });
};

export const fetchCompletedOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCompletedOrders);
    }, 500);
  });
};

export const createOrder = async (order) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockActiveOrders.push(order);
      resolve(order);
    }, 500);
  });
};

export const updateOrder = async ({ id, ...order }) => {
  return new Promise((resolve) => {
    const index = mockActiveOrders.findIndex((o) => o.id === id);
    if (index !== -1) {
      mockActiveOrders[index] = { id, ...order };
      resolve({ id, ...order });
    }
  });
};
