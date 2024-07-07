import { useGetAllPoliceStationsQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { useNavigate, Navigate } from "react-router-dom";
import styles from './PSJudicary.module.css';
import LoadingSpinner from "../../Components/Loading/Loading";


function PSJudicary() {

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllPoliceStationsQuery();

  if (isLoading) {
    return <div><LoadingSpinner/></div>
  }

  if (error) {
    return <Navigate to={'*'} replace={true} />
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
