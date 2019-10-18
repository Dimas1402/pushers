import React from "react";
// import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "../Style/Chat.css";
// import Echo from "laravel-echo";

// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: "4f688d2f2b7ce5101fad",
//   cluster: "ap1",
//   forceTLS: true
// });

// var channel = Echo.channel("my-channel");
// channel.listen(".my-event", function(data) {
//   alert(JSON.stringify(data));
// });
class Homes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      name: "",
      nameUser: "",
      id: "",
      idLogin: "",
      telp: "",
      email: "",
      chat: [],
      message: [],
      pesanChat: [],
      sender_id: "",
      receiver_id: "",
      text: "",
      idUser: "",
      avatar: null,
      on: false,
      onUpload: false
    };
  }

  componentDidMount() {
    const mystate = localStorage.getItem("user");
    const users = JSON.parse(mystate);
    const avatars = this.state.user;
    const names = this.state.user;
    const telps = this.state.user;
    const emails = this.state.user;
    const id = this.state.idLogin.id;
    this.handleChangeChat();
    setInterval(this.handleChangeChat, 5000);
    // const { idUser } = this.state.user;
    console.log("id", this.state.user);
    axios
      .get(`https://aqueous-hollows-28311.herokuapp.com/chat/${id}`)
      .then(res => {
        console.log("chat", res);
        const chat = res.data;
        this.setState({
          chat: chat
        });
      });
    this.setState({
      user: users,
      avatar: avatars,
      telp: telps,
      email: emails,
      name: names
    });
  }

  componentWillMount() {
    this.handleChangeChat();
    const mystate = localStorage.getItem("user");
    const users = JSON.parse(mystate);
    const text = this.state.text;

    this.setState({
      idLogin: users,
      text: text
    });
  }

  getUser = () => {
    const idUser = this.state.user.id;
    axios
      .get(`https://aqueous-hollows-28311.herokuapp.com/tampil/${idUser}`)
      .then(ress => {
        console.log("idUsers =>", ress.data);
        localStorage.setItem("user", JSON.stringify(ress.data));

        this.setState({
          user: ress.data
        });
      });
  };
  // uploadImage
  fileSelectedHandler = e => {
    e.preventDefault();
    const avatar = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onloadend = () => {
      this.setState({
        avatar: avatar,
        base64: reader.result
      });
      this.fileUploadHandler();
    };
  };

  // handleChangeEdit = e => {
  //   this.setState({
  //     [e.target.]: e.target.value
  //   });
  // };

  fileUploadHandler = () => {
    const id = this.state.user.id;

    // fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    axios
      .put(`https://aqueous-hollows-28311.herokuapp.com/avatar/edit`, {
        avatar: this.state.base64,
        id
      })
      .then(res => {
        console.log("uplod", res);
        this.getUser();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // edit
  handleChangeEdit = e => {
    e.preventDefault();
    console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value
      // this.fileEditData();
    });
  };

  fileEditData = () => {
    const id = this.state.id;
    const name = this.state.name;
    const telp = this.state.telp;
    const email = this.state.email;

    axios
      .put("https://aqueous-hollows-28311.herokuapp.com/user/edit", {
        id,
        name,
        telp,
        email
      })
      .then(res => {
        console.log(res);
        this.getUser();
        this.setState({
          name: this.state.user.name,
          telp: this.state.user.telp,
          email: this.state.user.email,
          id: this.state.user.id
        });
      });
  };

  // chat-------------------------------------->
  handleChangeChat = () => {
    const idLogin = this.state.user.id;
    const dataId = this.state.idUser;
    // const contact = this.state.chat[index + ];
    // const id = this.props.match.params;

    // console.log("IdUser <=", JSON.parse(chatData));

    console.log("IdUser <=", this.state.idUser);
    axios
      .get(
        `https://aqueous-hollows-28311.herokuapp.com/message/${idLogin}/` +
          dataId
      )
      .then(res => {
        localStorage.setItem("pesanChat", JSON.stringify(res.data.message));
        const pesan = res.data;
        const pesanChat = res.data.message;
        console.log("contactUser", res.data);
        this.setState({
          message: pesan,
          pesanChat: pesanChat
        });
      });
  };
  // toggle----------------------------------->
  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  toggleUpload = () => {
    this.setState({
      onUpload: !this.state.onUpload
    });
  };

  idChat = async chats => {
    // console.log("staet", this.state.idUser);
    const nameUser = chats.name;
    const dataId = await chats.id;
    console.log(dataId);
    console.log(nameUser);
    this.setState({
      idUser: dataId,
      nameUser: nameUser
    });
    this.handleChangeChat();
  };

  // kirim pesan-----------------------------------_>
  handleChangeMessage = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const dataPesan = {
      sender_id: this.state.user.id,
      receiver_id: this.state.idUser,
      text: this.state.text
    };

    console.log("sender", this.state.user);
    console.log("receiver", this.state.idUser);
    axios
      .post(
        "https://aqueous-hollows-28311.herokuapp.com/message/send",
        dataPesan
      )
      .then(res => {
        console.log("pesan terkirim", res);
        if (this.state.text === "") {
          alert("pesan kosong");
        }
        this.setState({
          text: ""
        });
      });
  };
  render() {
    const { idChat } = this;
    const chatt = this.state.chatUser;

    console.log(" ini chat ku yaaa", chatt);

    // const { receiver } = this.state.chatUser;
    const signOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };

    // console.log("inichatnya =>", receiver);
    console.log(localStorage.getItem("token"));
    // console.log(localStorage.getItem("user"));

    if (!localStorage.getItem("token", "user")) {
      return <Redirect to="/login" />;
    }
    // const { id } = this.props.match.params;
    // const { chat } = this.state.chat;
    return (
      <div id="chat" className="container">
        <div
          className="row"
          style={{ height: "100vh", background: "#eceff1", overflow: "scroll" }}
        >
          <div
            className="col-sm-4"
            style={{
              borderRight: "1px solid #ffff"
            }}
          >
            <div className="row">
              <div
                className="navbar"
                style={{
                  background: "#6a1b9a",
                  width: "100%",
                  height: "55px"
                }}
              >
                <img
                  src={this.state.user.avatar}
                  class="rounded-circle float-left "
                  width="40"
                  height="40"
                  alt={this.state.user.avatar}
                ></img>
                <p
                  id="nameUser"
                  style={{
                    color: "white",
                    fontSize: "12px",
                    marginRight: "70%"
                  }}
                >
                  {this.state.user.name}
                </p>
                <button
                  id="btn-edit"
                  type="button"
                  class="btn btn-outline-light"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                >
                  <i id="edit" className="fas fa-user-edit"></i>
                </button>
                {/* <i
                  onClick={this.toggle}
                  id="icon-edit"
                  class="fas fa-user-edit"
                  style={{
                    fontSize: "15px",
                    marginLeft: "120px"
                  }}
                ></i> */}
              </div>
            </div>
            {this.state.chat.map((chats, index) => (
              <div className="row" key={chats.id} onClick={() => idChat(chats)}>
                <div class="list-group" style={{ width: "100%" }}>
                  <Link to={`/chat/${index + 1}`}>
                    <button
                      id="btn-chat"
                      // onClick={this.handleChangeChat}
                      type="button"
                      class="list-group-item list-group-item-action"
                    >
                      {chats.name}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
            {/* 
           ------------------------------------------------ modal--------------------------------------------------------- */}
            <div
              class="modal fade"
              id="exampleModalLong"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLongTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Profil
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    {/* ------------------------------------- modal body ------------------------------------------ */}
                    <div>
                      <div id="toggle">
                        <div className="row image-profil">
                          <input
                            id="btn-profile"
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            onClick={this.toggleUpload}
                            onChange={this.fileSelectedHandler}
                          />
                          {this.state.onUpload && (
                            <div id="upload">
                              <button onClick={this.fileUploadHandler}>
                                Upload
                              </button>
                            </div>
                          )}
                          <img
                            id="img"
                            src={this.state.user.avatar}
                            className="rounded-circle"
                            width="150"
                            height="150"
                            alt={this.state.user.avatar}
                          ></img>
                        </div>

                        <div className="row ml-1" style={{ marginTop: "20px" }}>
                          <a
                            style={{
                              color: "grey",
                              borderBottom: "1px solid grey"
                            }}
                          >
                            Username
                          </a>{" "}
                          <p style={{ marginLeft: "20px" }}>
                            {this.state.user.name}
                          </p>
                          {/* -------- modal -------- */}
                          <div className="edit">
                            <button
                              id="button-edit"
                              type="button"
                              class="btn btn-outline-primary border-0"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              data-whatever="@getbootstrap"
                            >
                              edit
                            </button>
                          </div>
                          <div
                            class="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Edit Profil
                                  </h5>
                                  <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    <div class="form-group">
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                      >
                                        Username
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="recipient-name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChangeEdit}
                                      />
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                      >
                                        Telp
                                      </label>
                                      <input
                                        type="number"
                                        class="form-control"
                                        id="recipient-name"
                                        name="telp"
                                        onChange={this.handleChangeEdit}
                                        value={this.state.telp}
                                      />
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                      >
                                        Email
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="recipient-name"
                                        name="email"
                                        onChange={this.handleChangeEdit}
                                        value={this.state.email}
                                      />
                                    </div>
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    onClick={this.fileEditData}
                                    type="button"
                                    class="btn btn-primary"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* ------- modal ---------- */}
                        </div>

                        <div style={{ marginTop: "20px" }} className="row ml-1">
                          <a
                            style={{
                              color: "grey",
                              borderBottom: "1px solid grey"
                            }}
                          >
                            telp
                          </a>
                          <p style={{ marginLeft: "65px" }}>
                            {this.state.user.telp}
                          </p>
                          {/* -------- modal -------- */}
                          <div className="edit">
                            <button
                              id="button-edit"
                              type="button"
                              class="btn btn-outline-primary border-0"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              data-whatever="@getbootstrap"
                            >
                              edit
                            </button>
                          </div>
                          {/* ------- modal ---------- */}
                        </div>
                        <div className="row ml-1" style={{ marginTop: "20px" }}>
                          <a
                            style={{
                              color: "grey",
                              borderBottom: "1px solid grey"
                            }}
                          >
                            Email
                          </a>{" "}
                          <p style={{ marginLeft: "53px" }}>
                            {" "}
                            {this.state.user.email}
                          </p>
                          {/* -------- modal -------- */}
                          <div className="edit">
                            <button
                              id="button-edit"
                              type="button"
                              class="btn btn-outline-primary border-0"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              data-whatever="@getbootstrap"
                            >
                              edit
                            </button>
                          </div>
                          {/* ------- modal ---------- */}
                        </div>

                        <Link to="/login">
                          <p style={{ marginTop: "10px" }} onClick={signOut}>
                            logout
                          </p>
                        </Link>
                      </div>
                    </div>
                    {/* ---------------------------- modal body ----------------------------- */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="row">
              <div
                className="navbar"
                style={{
                  background: "#6a1b9a",
                  width: "100%",
                  height: "55px"
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "15px"
                  }}
                >
                  {this.state.nameUser}
                </p>
                <br></br>
                <p id="online" style={{ fontSize: "8px" }}>
                  online
                </p>
              </div>

              <div className="col">
                <div class="list-group" style={{ width: "100%" }}>
                  <ul class="list-group">
                    {this.state.pesanChat.map((chat, index) => (
                      <div>
                        {this.state.user.id === chat.sender_id ? (
                          <li
                            className="list-group-item"
                            style={{ width: "50%", float: "right" }}
                          >
                            pengirim => {chat.text}
                          </li>
                        ) : (
                          <li
                            className="list-group-item"
                            style={{ width: "50%", float: "left" }}
                          >
                            penerima => {chat.text}
                          </li>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              {/* {this.state.senders.map((senders, index) => (
                <div className="col">
                  <div class="list-group" style={{ width: "100%" }}>
                    <ul class="list-group">
                      <li style={{ margin: "10px" }} class="list-group-item">
                        {senders.text}
                      </li>
                    </ul>
                  </div>
                </div>
              ))} */}
            </div>
            <div id="icon-mess" className="row">
              <form onSubmit={this.handleSubmit}>
                <input
                  class="form-control"
                  style={{ position: "absolute", bottom: "0" }}
                  type="text"
                  placeholder="kirim pesan...."
                  value={this.state.text}
                  onChange={this.handleChangeMessage}
                ></input>
                <i class="far fa-comment-dots"></i>
                <button type="submit" class="btn btn-outline-light">
                  {" "}
                  <i id="send" class="fas fa-arrow-circle-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homes;
