import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please input a name")
    .min(2, "name must be more than 2 characters"),
  size: yup.string().required("must choose a pizza size"),
  topppings: yup.boolean().oneOf([true], "must choose your toppings")
});

export default function Pizza() {
  return <div>PIIIZZA</div>;
}
