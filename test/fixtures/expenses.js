import moment from "moment";

export default [
  { id: "1", description: "Water bill", amount: 4500, note: "", createdAt: 0 },
  {
    id: "2",
    description: "Rent",
    amount: 2500,
    note: "This is the rent of the house",
    createdAt: moment(0).subtract(4, "days").valueOf()
  },
  {
    id: "3",
    description: "Gas bill",
    amount: 5500,
    note: "",
    createdAt: moment(0).add(4, "days").valueOf()
  }
];
