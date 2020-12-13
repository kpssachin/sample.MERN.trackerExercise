import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CreateExercise(props) {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]); // list of users
  useEffect(() => {
    axios.get(process.env.REACT_APP_GET_USER_ENDPOINT)
    .then(res=>{
      if(res.data.length>0){
        setUsers(res.data.map(user=>user.username));
        setUsername(res.data[0].username);
      }
    })
    .catch(err=>console.log('unable to fetch:',err));
  },[]);
  let history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username,
      description,
      duration,
      date,
    };
    console.log(
      "🚀 ~ file: create-user.component.js ~ line 18 ~ onSubmit ~ exercise",
      exercise
    );
    axios.post(process.env.REACT_APP_ADD_EXERCISE_ENDPOINT, exercise)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
    history.goBack();
  }

  return (
    <div>
      <h2>Create New Exercise Log</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>User Name</label>
          <select
            className="form-control"
            id="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            type="test"
            className="form-control"
            id="description"
            placeholder="Write"
            value={description}
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input
            type="number"
            className="form-control"
            value={duration}
            id="duration"
            placeholder="Write"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <ReactDatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Exercise Log
        </button>
      </form>
    </div>
  );
}