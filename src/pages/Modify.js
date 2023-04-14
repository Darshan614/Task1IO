import AddForm from "../Components/AddForm";
import Delete from "../Components/Delete";
import { useParams } from "react-router-dom";
import EditForm from "../Components/EditForm";

function Modify() {
  const params = useParams();
  return (
    <>
      {params.modify === "addProduct" && <AddForm />}
      {params.modify === "editProduct" && <EditForm />}
      {params.modify === "deleteUser" && <Delete />}
    </>
  );
}

export default Modify;
