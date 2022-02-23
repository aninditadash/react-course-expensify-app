import React from "react";
import moment from "moment";
import numeral from "numeral";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="expense-list-item" to={`/edit/${id}`}>
    <div>
      <p className="expense-list-item__title expense-list-item--bold">
        {description}
      </p>
      <p className="expense-list-item__subtitle">
        {moment(createdAt).format("MMMM Do, YYYY")}
      </p>
    </div>
    <p className="expense-list-item__data expense-list-item--bold">
      {numeral(amount).format("$0,0.00")}
    </p>
  </Link>
);

export default ExpenseListItem;
