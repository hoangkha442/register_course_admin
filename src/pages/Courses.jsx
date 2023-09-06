import { useParams } from "react-router-dom";

const Courses = () => {
  const { bID } = useParams();
  return (
    <div className="">
      <h1>Courses / {bID}</h1>
      <p>kashjdajsd</p>
    </div>
    
  );
};

export default Courses;
