import AddForm from "../Components/AddForm";
import Delete from "../Components/Delete";
import { useParams } from "react-router-dom";

function Modify() {
  const params = useParams();
  return (
    <>
      {params.modify === "addProduct" && <AddForm />}
      {params.modify === "editProduct" && <AddForm />}
      {params.modify === "deleteUser" && <Delete />}
    </>
  );
}

export default Modify;
