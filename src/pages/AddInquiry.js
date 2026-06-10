import { useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function AddInquiry() {
  const [form, setForm] = useState({
    name: "",
    std: "",
    mobileNumber: "",
    schoolCollege: "",
  });

  const submit = async () => {
    try {
      await API.post("/inquiry", form);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Inquiry Added Successfully 🎉",
        confirmButtonColor: "#2563eb",
      });

      // Form reset
      setForm({
        name: "",
        std: "",
        mobileNumber: "",
        schoolCollege: "",
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="inquiry-page">
      <div className="inquiry-card">
        <div className="inquiry-header">
          <h2>Add New Inquiry</h2>
          <p>Enter student inquiry details</p>
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={form.name}
            placeholder="Enter student name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Standard</label>
          <input
            type="text"
            value={form.std}
            placeholder="Enter standard"
            onChange={(e) =>
              setForm({ ...form, std: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            value={form.mobileNumber}
            placeholder="Enter mobile number"
            onChange={(e) =>
              setForm({
                ...form,
                mobileNumber: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>School / College</label>
          <input
            type="text"
            value={form.schoolCollege}
            placeholder="Enter school or college name"
            onChange={(e) =>
              setForm({
                ...form,
                schoolCollege: e.target.value,
              })
            }
          />
        </div>

        <button className="save-btn" onClick={submit}>
          Add Inquiry
        </button>
      </div>
    </div>
  );
}