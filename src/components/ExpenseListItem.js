import React from "react";
import moment from "moment";
import numeral from "numeral";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <p>Description: {description}</p>
    <p>Amount: {numeral(amount).format("$0,0.00")}</p>
    <p>Created At: {moment(createdAt).format("MMMM Do, YYYY")}</p>

    <Link to={`/edit/${id}`}>Edit</Link>
  </div>
);

export default ExpenseListItem;
