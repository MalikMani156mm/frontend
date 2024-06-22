import { useGetAllPoliceStationsQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { useNavigate, Link } from "react-router-dom";
import styles from './PSJudicary.module.css';


function PSJudicary() {

  const navigate = useNavigate();

  const { data, error } = useGetAllPoliceStationsQuery();



  if (error) {
    return (<>
      <h1 style={{ textAlign: 'center' }}>{error.message || "Something Wrong Happened"}</h1>
      <h3 style={{ textAlign: 'center' }}>May be Server is down</h3>
      <h3 style={{ textAlign: 'center' }}>Go back to <Link to="/" className="homelink">Home</Link></h3>
    </>)
  }

  return (
    <>
      <div className="container1">
        <div className="container">
          <h1>Police Station Judiciary</h1>
          <p>
            This feature will generally give you information about all the Police Stations of Islamabad, including their exact location, SHOs, judicial boundary limits, etc. Moreover, it will assist you in finding the nearest police station to your house, making it convenient for you. It will also help you by recommending the right police station which will entertain your incident area judiciously.
          </p>
        </div>
        <div className={styles.buttonBody}>
        {
        data && data.map(PS => (
          <button className={styles.Button} onClick={() => { navigate(`/PSJudicary/${PS._id}`) }}>
            {PS.PSName}
          </button>
        ))}
        </div>
      </div>
      
    </>
  );
}

export default PSJudicary;
