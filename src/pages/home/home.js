import { useContext } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { HabitContext } from "../../context/habitContext";
import { HabitModal } from "../../component/modal/habitModal";
export const Home = () => {
  const { state, showModal, setShowModal, setAddHabit } =
    useContext(HabitContext);
  return (
    <div className="home-page">
      <h2 className="">Habit Tracker App</h2>
      <div>
        <Link to="/archive">Archive</Link>
      </div>
      {showModal.show && <HabitModal />}
      <div className="habit-card">
        <div
          className="new-habit"
          onClick={() => {
            setShowModal({ show: true, data: "" });
            setAddHabit(true);
          }}
        >
          <p className="habit-name">Create New Habit</p>
          <img
            className="habit-img"
            alt="new habit"
            src={
              "https://media.istockphoto.com/id/538493760/photo/clear-empty-photographer-studio-background.jpg?b=1&s=612x612&w=0&k=20&c=2YM7q2J5XaIQtPmdagnIkFwNFUC7Xkpb2r8_7WnkBx4="
            }
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
        {state.habits.map((item) => {
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
