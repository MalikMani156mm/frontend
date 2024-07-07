import { useDeletePoliceStationMutation, useGetAllPoliceStationsQuery } from "../../Redux/Features/PoliceStationInfo/PoliceStationApi";
import { Navigate, useParams } from "react-router-dom";
import styles from './PSJudicary.module.css';
import { useState } from "react";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import LoadingSpinner from "../../Components/Loading/Loading";


function DeletePoliceStation() {

  const { id } = useParams();
  console.log(id);

  const { data, error, isLoading } = useGetAllPoliceStationsQuery();

// eslint-disable-next-line 
const [deletePoliceStation, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeletePoliceStationMutation();
const [deletionError, setDeletionError] = useState(null);
const [showConfirmation, setShowConfirmation] = useState(false);
const [selectedId, setSelectedId] = useState(null);

const handleDelete = async (_id) => {
    setSelectedId(_id);
    setShowConfirmation(true);
};

const handleConfirmDelete = async (_id) => {
    try {
        await deletePoliceStation(selectedId).unwrap();
    } catch (err) {
        setDeletionError(err);
    }
    setShowConfirmation(false);
};

const handleCancelDelete = () => {
    setShowConfirmation(false);
};

  if (error || deletionError) {
    return <Navigate to={'*'} replace={true} />
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="container1">
        
        <div className={styles.buttonBody}>
          {
            data && data.map(PS => (
              <button className={styles.Button} onClick={() => handleDelete(PS._id)}>
                {PS.PSName}
              </button>
            ))}
        </div>
      </div>
      {showConfirmation && (
                <CustomAlert
                    message="Are you sure you want to delete this PoliceStation?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    buttonLabel={"Confirm"}
                />
            )}
    </>
  );
}

export default DeletePoliceStation;
