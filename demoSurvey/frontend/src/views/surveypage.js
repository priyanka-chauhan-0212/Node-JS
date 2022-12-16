/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import data from "./database/data";

export const Questions = () => {
  const [checked, setChecked] = useState();
  const [value, setValue] = useState();

  const navigate = useNavigate();

  //   console.log("Data     questions:", questions.data[0]);
  //   const question = questions;

  const question1 = data[0];
  //   const question2 = data[1];

  //   const question = axios
  //     .get("http://localhost:4000/getQuestions")
  //     .then((res) => {
  //       const data = res.data.data;
  //       //   console.log("Data:", data);
  //     });
  //   console.log("Data:", question.data);

  useEffect(() => {
    console.log(data);
  });

  //   const values = [];
  const handleSelect = (event) => {
    setChecked(event.target.value);
  };
  console.log("Checked------------", checked);

  function onNext() {
    let formData = {
      answer1: checked,
    };

    console.log("On Next Click", formData);
    const question = axios
      .post("http://localhost:4000/createOption", formData)
      .then((res) => {
        console.log("success", res);
        if (res.data.success === 1) {
          //   setValue(checked);
          toast(res.data.message);
          //   navigate("/page2");
        } else {
          toast(res.data.message);
        }

        // console.log("Data:", res.data.UserData);
      });
    // let bodyData = values;
  }
  console.log("Value--------", value);

  return (
    <div>
      <h3>{question1.question}</h3>
      <ul key={question1.id}>
        {question1.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={`options${i + 1}`}
              name="options"
              id={`q${i}-option`}
              onChange={handleSelect}
            />

            <label htmlFor={`q${i}-option`}>{q}</label>
            <div className="check"></div>
          </li>
        ))}
      </ul>

      <br />
      <br />

      {/* <h3>{question2.question}</h3>
      <ul key={question2.id}>
        {question2.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={`options${i + 1}`}
              name="options"
              id={`q${i}-option`}
              onChange={(event) => this.setChecked(event.target.value)}
            />

            <label htmlFor={`q${i}-option`}>{q}</label>
            <div className="check"></div>
          </li>
        ))}
      </ul> */}

      <button onClick={onNext}>Next</button>

      <>
        <div className="display">
          <h2>Selected : {checked}</h2>
        </div>
      </>

      {/* 
      <ul>
        <li>
          <input
            type="radio"
            value={false}
            name="options"
            id={`q1-option`}
            onChange={onSelect()}
          />

          <label htmlFor={`q1-option`}>option</label>
          <div className="check"></div>
        </li>
      </ul> */}
    </div>
  );
};
