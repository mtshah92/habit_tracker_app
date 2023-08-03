import { useContext } from "react";
import { Link } from "react-router-dom";
import { HabitContext } from "../../context/habitContext";

export const Archive = () => {
  const { state, setShowModal } = useContext(HabitContext);
  return (
    <div className="archive-page">
      <h2>Arhived Habits</h2>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div className="habit-card">
        {state.archive.map((item) => {
          const { id, name, image_url } = item;
          return (
            <div
              className="new-habit each-habit"
              key={id}
              onClick={() => {
                setShowModal({ show: true, data: id });
              }}
            >
              <p className="habit-name">{name}</p>
              <img className="habit-img" alt={name} src={image_url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
