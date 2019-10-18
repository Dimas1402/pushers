import React from "react";
import { Link, Redirect } from "react-router-dom";

class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  render() {
    const signOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };
    console.log(localStorage.getItem("token"));
    // console.log(localStorage.getItem("user"));

    if (!localStorage.getItem("token", "user")) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
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
                  <button onClick={this.props.fileUploadHandler}>Upload</button>
                </div>
              )}
              {/* <input className="form-input" type="file" onChange={this.fileSelectedHandler} /> */}
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
              <a style={{ color: "grey", borderBottom: "1px solid grey" }}>
                Username
              </a>{" "}
              <p style={{ marginLeft: "20px" }}>{this.state.user.name}</p>
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
                      <h5 class="modal-title" id="exampleModalLabel">
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
                          <label for="recipient-name" class="col-form-label">
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
                          <label for="recipient-name" class="col-form-label">
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
                          <label for="recipient-name" class="col-form-label">
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
              <a style={{ color: "grey", borderBottom: "1px solid grey" }}>
                telp
              </a>
              <p style={{ marginLeft: "65px" }}>{this.state.user.telp}</p>
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
              <a style={{ color: "grey", borderBottom: "1px solid grey" }}>
                Email
              </a>{" "}
              <p style={{ marginLeft: "53px" }}> {this.state.user.email}</p>
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
      </div>
    );
  }
}

export default Profil;
