import React, { Fragment, useEffect, useState } from "react";
import "./RSASendMessage.css";
import bigInt from "big-integer";
import Swal from "sweetalert2";
import { getAuth, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { XEM_THU_GUI_DEN } from "../../redux/const/RSASenderConst";
import HomThuSender from "./HomThuSender";

export default function RSASendMessage() {
  let loggined = useSelector((state) => state.logginedReducer.loggined);
  const dispatch = useDispatch();
  const [publicKey, setPublicKey] = useState({ n: "", e: "" });
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [uploadedMessage, setUploadedMessage] = useState(""); // Đối tượng state để lưu trữ nội dung của tệp tin tin nhắn
  const [typeTextInput, setTypeTextinput] = useState("");
  // Khai báo state cho giá trị của các input và textarea
  const [senderMessage, setSenderMessage] = useState("");
  const [receiverInput, setReceiverInput] = useState("");
  const handleReset = () => {
    setSenderMessage("");
    setReceiverInput("");
    setEncryptedMessage("");
    setUploadedMessage("");
  };
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Vui lòng chọn một tập tin.");
      return;
    }

    if (!file.type.match("text.*")) {
      alert("Chỉ chấp nhận tập tin có định dạng văn bản.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setUploadedMessage(content); // Cập nhật nội dung của tệp tin tin nhắn đã tải lên vào đối tượng state mới
    };
    reader.readAsText(file);

    Swal.fire({
      text: "Upload file thành công!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const encryptUploadedMessage = () => {
    encryptMessage(uploadedMessage); // Gọi hàm mã hóa tin nhắn với nội dung của tệp tin đã tải lên
  };

  const encryptMessage = (message) => {
    if (message === -1) {
      Swal.fire({
        title: "Lỗi",
        text: "Vui lòng chọn nhập tin nhắn hoặc upload file để mã hóa!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!publicKey || !publicKey.n) {
      Swal.fire({
        title: "Lỗi",
        text: "Vui lòng tạo cặp khóa trước khi mã hóa tin nhắn.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (publicKey.n === "0") {
      Swal.fire({
        title: "Lỗi",
        text: "Modulus n không thể bằng 0. Vui lòng tạo lại cặp khóa.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (message.trim() === "") {
      Swal.fire({
        title: "Lỗi",
        text: "Tin nhắn không được để trống.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const charCodes = Array.from(message).map((char) => char.charCodeAt(0));

    const encryptedCharCodes = charCodes.map((charCode) =>
      bigInt(charCode).modPow(bigInt(publicKey.e), bigInt(publicKey.n))
    );

    const encryptedHex = encryptedCharCodes
      .map((charCode) => charCode.toString(16))
      .join(",");

    setEncryptedMessage(encryptedHex);
    Swal.fire({
      title: "Thành công",
      text: "Tin nhắn đã được mã hóa.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  let marginBottomNhapTinNhanButton = "";
  if (typeTextInput) {
    marginBottomNhapTinNhanButton = "12px";
  } else if (!typeTextInput) {
    marginBottomNhapTinNhanButton = "43px";
  }

  let marginTopMaHoa_1 = "";
  if (typeTextInput) {
    marginTopMaHoa_1 = "10px";
  } else {
    marginTopMaHoa_1 = "20px";
  }
  const auth = getAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  if (localStorage.getItem("loggined") == "true") {
    return (
      <div
        width={width}
        className="container-fluid"
        style={{ backgroundColor: "#E2DFD0", height: height }}
      >
        <div
          className="row firstRow p-3"
          style={{ backgroundColor: "#524C42", marginBottom: "2%" }}
        >
          <h3 className="account">
            Tài khoản: {JSON.parse(localStorage.getItem("email"))}
          </h3>
          <h1
            className="text-center  h1_firstTitle"
            style={{ color: "#F97300" }}
          >
            Gửi tin nhắn
          </h1>
          <span
          style={{width: "20px"}}
            className="goBack"
            onClick={() => {
              navigate("/home");
            }}
          >
            <i class="fa fa-arrow-left"></i>
            <span>Go home</span>
          </span>
        </div>
        <div className="row secondRow">
          <div className="col-4">
            <div className="section">
              <h2>
                Hòm thư{" "}
                <i style={{ color: "#F3CA52" }} class="fa fa-envelope"></i>
              </h2>
              <hr />
              <div>
                <i style={{ marginRight: 5 }} class="fa fa-envelope"></i>
                <span>Thư đến </span>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    dispatch({
                      type: XEM_THU_GUI_DEN,
                      Component: <HomThuSender />,
                    });
                  }}
                >
                  Click vào để xem
                </button>
              </div>

              <br />
            </div>
          </div>
          <div className="col-4">
            <div className="section">
              <h2>
                Mã hóa <i class="fa fa-code text-primary"></i>
              </h2>
              <hr />
              <div>
                <div style={{ margin: "auto" }}>
                  {!uploadedMessage ? (
                    <button
                      style={{
                        marginBottom: `${marginBottomNhapTinNhanButton}`,
                      }}
                      className="btn btn-info me-3 mt-0"
                      onClick={() => {
                        setTypeTextinput(true);
                      }}
                    >
                      Nhập tin nhắn
                    </button>
                  ) : (
                    <button
                      className="btn btn-info me-3 mt-0"
                      disabled={true}
                      style={{
                        cursor: "no-drop",
                        marginBottom: `${marginBottomNhapTinNhanButton}`,
                      }}
                    >
                      Nhập tin nhắn
                    </button>
                  )}

                  <button
                    style={{ marginBottom: `${marginBottomNhapTinNhanButton}` }}
                    className="btn btn-info mt-0"
                    onClick={() => {
                      document.getElementById("fileInput").click();
                      setTypeTextinput(false);
                    }}
                  >
                    Upload file txt
                  </button>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".txt"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                </div>
                {typeTextInput ? (
                  <div className="d-flex align-items-center">
                    <span className="me-3">Đầu vào</span>
                    <input
                      id="senderMessage"
                      placeholder="Nhập tin nhắn"
                      className="form-control"
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {!uploadedMessage ? (
                <button
                  style={{ marginTop: `${marginTopMaHoa_1}` }}
                  className="btn btn-primary"
                  onClick={() => {
                    if (typeTextInput) {
                      encryptMessage(
                        document.getElementById("senderMessage").value
                      );
                    } else {
                      encryptMessage(-1);
                    }
                  }}
                >
                  Mã hóa tin nhắn
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={encryptUploadedMessage} // Khi người dùng nhấp vào nút "Mã hóa", gọi hàm để mã hóa tin nhắn từ tệp tin đã tải lên
                >
                  Mã hóa file
                </button>
              )}
              <p className="mb-0">Kết quả sau khi mã hóa:</p>
              <textarea
                className="form-control textarea_SR fdakfjda"
                style={{ width: 300, height: 300, margin: "auto" }}
                id="encryptedMessage"
                readOnly
                value={encryptedMessage}
              />
            </div>
          </div>

          <div className="col-4">
            <div className="section">
              <h2>
                Gửi tin nhắn <i class="fa fa-paper-plane text-primary"></i>
              </h2>
              <hr />
              <div className="form-group">
                <p className="fs-4">Chọn người để gửi</p>
                <select className="form-control">
                  <option value={1}>Người 1</option>
                  <option value={2}>Người 2</option>
                  <option value={3}>Người 3</option>
                </select>
              </div>
              <button className="btn btn-primary">Gửi</button>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          {encryptedMessage && (
            <button className="btn btn-info" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      </div>
    );
  } else {
    alert("Vui lòng đăng nhập để có thể dùng ứng dụng");
    return <Navigate to={"/login"} />;
  }
}
