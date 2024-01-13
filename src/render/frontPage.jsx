import React, { useEffect, useState } from "react";
import Base from "./profile";
import "../App.css";
import CustomizedInputBase from "../Components/AddTodo";
import IconButton from "@mui/material/IconButton";
import ListIcon from "../assets/icons/ListIcon";
import ChevronIcon from "../assets/icons/ChevronIcon";
import { Typography } from "@mui/material";
import ShortAccordian from "../Components/ShowHome";
import { BASE_URL } from "../routes/backendRoute";
import { ToastContainer } from "react-toastify";

function Home() {
  const [todoData, setTodoData] = useState();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(BASE_URL + `/todo/getAllTodo`)
      .then((response) => response.json())
      .then((response) => {
        let arr = [];
        for (let i = 0; i < response.data.length; i++) {
          let obj = {
            counter: i + 1,
            _id: response.data[i]._id,
            todoDescription: response.data[i].todoDescription,
            createdAt: response.data[i].createdAt,
            completed: response.data[i].completed,
          };
          arr.push(obj);
        }
        setTodoData(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showHide = () => {
    setOpen(!open);
  };

  return (
    <Base>
      <ToastContainer />
      <div>
        <CustomizedInputBase reload={fetchData} />
        <div style={{ marginTop: 15 }}>
          <div
            style={{
              padding: 10,
              display: "flex",
              alignItems: "center",
              width: 400,
              backgroundColor: "#FCD7AD",
              borderRadius: 5,
              border: "2px solid white",
            }}
          >
            <IconButton onClick={showHide}>
              <ListIcon />
            </IconButton>
            <Typography
              fullWidth
              style={{ flex: 1, marginLeft: 8, marginRight: 8, color: "black" }}
            >
              Your Todo
            </Typography>
            <IconButton onClick={showHide}>
              <ChevronIcon />
            </IconButton>
          </div>
        </div>
        {open ? (
          <div
            style={{
              marginTop: 10,
              backgroundColor: "#F7E8D6",
              borderRadius: 30,
            }}
          >
            {todoData?.length>0 ?
              (todoData.map((i) => {
              return (
                <ShortAccordian
                  reload={fetchData}
                  description={i.todoDescription}
                  counter={i.counter}
                  id={i._id}
                  completed={i.completed}
                  createdAt={i.createdAt}
                />
              )
            })): (
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    alignItems: "center",
                    height:150,
                    width: 400,
                    border: "2px solid white",
                    marginTop: 10,
                    backgroundColor: "#F7E8D6",
                    borderRadius: 10,
                  }}
                >
                  <Typography
                    fullWidth
                    style={{ textAlign:"center",flex: 1, marginLeft: 8, marginRight: 8, color: "black" }}
                  >
                    No Task Today
                  </Typography>
                  </div>
              )
            }
          </div>
         ) :""
          }
      </div>
    </Base>
  );
}

export default Home;
