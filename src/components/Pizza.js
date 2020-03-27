import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please input a name")
    .min(2, "name must be more than 2 characters"),
  size: yup.string().required("must choose a pizza size"),
  topppings: yup.boolean().oneOf([true], "must choose your toppings"),
  instructions: yup.string().required("must include special instructions")
});

export default function Pizza() {
  //setting state to my Order button
  const [button, setButton] = useState(true);

  //setting a state for my Pizza form
  const [formState, setFormState] = useState({
    name: "",
    size: "",
    toppings: "",
    instructions: ""
  });

  //setting state for my erros
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    toppings: "",
    instructions: ""
  });

  //setting state for my Post request (that submits form and returns a database record of name, pizza size, sauce, and special instructions)
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButton(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/pizza", formState)
      .then(res => {
        setPost(res.data);

        setFormState({
          name: "",
          size: "",
          toppings: "",
          instructions: ""
        });
      })
      .catch(err => console.log("You form was not submitted", err.response));
  };

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(
        e.target.name === "toppings" ? e.target.checked : e.target.value
      )
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  //   // obtain reference to checkboxes named toppinFlavor[]
  //   const toppinFlavor = document.forms["pizzaForm"].elements["toppinFlavor[]"];

  //   //   You can loop through the list and attach an onclick handler to each checkbox with the following:
  //   // using reference to sports obtained above
  //   for (var i = 0, len = toppinFlavor.length; i < len; i++) {
  //     toppinFlavor[i].onclick = doSomething;
  //   }

  //   // access properties of checkbox clicked using 'this' keyword
  //   function doSomething() {
  //     if (this.checked) {
  //       // if checked ...
  //       alert(this.value);
  //     } else {
  //       // if not checked ...
  //     }
  //   }

  return (
    <form class="pizzaForm" onSubmit={formSubmit}>
      <Link to={"/"}>
        <div>Home Page</div>
      </Link>
      <h1>Build your pizza and submit your order!!</h1>
      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {/* this error connects with the schema for the first error that i wrotte */}
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <br />
      <label htmlFor="size">
        What size of pizza would you like?
        <select id="size" name="size" onChange={inputChange}>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
      </label>
      <br />

      <p>Check the types of toppings that you would like:</p>

      <p>
        <label htmlFor="cheese">
          <input id="cheese" type="checkbox" name="cheese" value="cheese" />
          cheese
        </label>
        <label htmlFor="tomato">
          <input id="tomato" type="checkbox" name="tomato" value="tomato" />
          tomato
        </label>
        <label htmlFor="pepperoni">
          <input
            id="pepperoni"
            type="checkbox"
            name="pepperoni"
            value="pepperoni"
          />
          pepperoni
        </label>
        <label htmlFor="olives">
          <input id="olives" type="checkbox" name="olives" value="olives" />
          olives
        </label>
      </p>

      <label htmlFor="instructions">
        Special Instructions:
        <textarea
          name="instructions"
          value={formState.instructions}
          onChange={inputChange}
        />
        {errors.instructions.length > 0 ? (
          <p className="error">{errors.instructions}</p>
        ) : null}
      </label>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={button}>Submit</button>
    </form>
  );
}
