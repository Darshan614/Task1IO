import AddForm from "../Components/Admin/AddForm";
import Delete from "../Components/Admin/Delete";
import { useParams } from "react-router-dom";
import EditForm from "../Components/Admin/EditForm";

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
