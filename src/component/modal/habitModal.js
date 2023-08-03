import { useContext, useState } from "react";
import "./habitModal.css";
import { HabitContext } from "../../context/habitContext";
export const HabitModal = () => {
  const { state, dispatch, showModal, setShowModal, addHabit, setAddHabit } =
    useContext(HabitContext);

  const newId = state.habits.slice(-1)[0].id + 1;
  console.log(newId);
  const filterData = showModal.data
    ? state.habits.filter((item) => item.id === showModal.data)
    : [
        {
          id: newId,
          name: "",
          goal: "",
          repeat: "",
          time_of_day: "",
          start_date: "",
          image_url: "https://picsum.photos/200/300/?blur",
        },
      ];

  const { id, name, goal, repeat, time_of_day, start_date, image_url } =
    filterData[0];

  const [habitInput, setHabitInput] = useState({
    id: id,
    name: name,
    repeat: repeat,
    goal: goal,
    time_of_day: time_of_day,
    start_date: start_date,
    image_url: image_url,
  });

  return (
    <div className="habitModal">
      <h2>Habit</h2>

      <div className="container-one">
        <label for="name">Name</label>
        <input
          className="habit-name-input"
          id="name"
          value={habitInput.name}
          onChange={(e) =>
            setHabitInput({ ...habitInput, name: e.target.value })
          }
        />
      </div>
      <div className="containter-two">
        <div className="item-one">
          <p>Repeat</p>
          <select
            name="repeat"
            id="repeat"
            onChange={(e) =>
              setHabitInput({ ...habitInput, repeat: e.target.value })
            }
          >
            <option disabled>Select Repeat</option>
            <option value="daily" selected={"daily" === repeat}>
              Daily
            </option>
            <option value="weekdays" selected={"weekdays" === repeat}>
              Weekdays
            </option>
            <option value="weekly" selected={"weekly" === repeat}>
              Weekly
            </option>
          </select>
        </div>
        <div className="item-two">
          <p>Goal</p>
          <select
            name="goal"
            id="goal"
            onChange={(e) =>
              setHabitInput({ ...habitInput, goal: e.target.value })
            }
          >
            <option disabled>Select Goal</option>
            <option value="30 minutes" selected={"30 minutes" === goal}>
              30 minutes
            </option>
            <option value="20 minutes" selected={"20 minutes" === goal}>
              20 minutes
            </option>
            <option value="60 minutes" selected={"60 minutes" === goal}>
              60 minutes
            </option>
          </select>
        </div>
        <div className="item-three">
          <p>Time of Day</p>
          <select
            name="time_of_day"
            id="time_of_day"
            onChange={(e) =>
              setHabitInput({ ...habitInput, time_of_day: e.target.value })
            }
          >
            <option disabled>Select Time of Day</option>
            <option value="morning" selected={"morning" === time_of_day}>
              Morning
            </option>
            <option value="afternoon" selected={"afternoon" === time_of_day}>
              Afternoon
            </option>
            <option value="evening" selected={"evening" === time_of_day}>
              Evening
            </option>
          </select>
        </div>
        <div className="item-four">
          <p>Start Time</p>
          <input
            type="date"
            value={habitInput.start_date}
            onChange={(e) =>
              setHabitInput({ ...habitInput, start_date: e.target.value })
            }
          />
        </div>
      </div>
      <div className="container-four">
        <button
          onClick={() => {
            setShowModal({ show: false });

            if (addHabit) {
              dispatch({ type: "add", id: newId, payload: habitInput });
              setAddHabit(false);
            } else {
              dispatch({ type: "save", id: id, payload: habitInput });
            }
          }}
        >
          {addHabit ? "Add" : "Save"}
        </button>
        {!addHabit && (
          <button
            onClick={() => {
              setShowModal({ show: false });
              dispatch({ type: "delete", payload: id });
            }}
          >
            Delete
          </button>
        )}
        <button
          onClick={() => {
            setShowModal({ show: false });
            dispatch({ type: "archive", id: id, payload: habitInput });
          }}
        >
          Archive
        </button>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};
