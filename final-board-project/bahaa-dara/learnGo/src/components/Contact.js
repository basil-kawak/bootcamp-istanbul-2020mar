import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdbreact";

export default class Contact extends Component {
  render() {
    return (
      <MDBRow className="contactCard">
        <MDBCol md="2">
          <MDBCard>
            <MDBCardImage
              hover
              overlay="white-slight"
              className="card-img-top"
              src="https://scontent.fist6-2.fna.fbcdn.net/v/t1.0-9/p960x960/84939729_2520878701294090_7832663743828852736_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=ALPJehF8BuAAX91X2jN&_nc_ht=scontent.fist6-2.fna&_nc_tp=6&oh=c1ace46c5c3a0c7947887df930652438&oe=5F0A8A2C"
              alt="Bahaa"
            />

            <MDBCardBody className="text-center">
              <h5 className="pink-text">Contributor</h5>
              <MDBCardTitle className="card-title">
                <strong>Bahaa Dabbagh</strong>
              </MDBCardTitle>

              <p className="font-weight-bold blue-text">
                Fron-End Web Developer
              </p>

              <MDBCardText>
                Sed ut perspiciatis unde omnis iste natus sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.{" "}
              </MDBCardText>

              <MDBCol md="12" className="d-flex justify-content-center">
                <a href="!#" className="px-2 fa-lg li-ic">
                  <MDBIcon fab icon="linkedin-in"></MDBIcon>
                </a>

                <a href="!#" className="px-2 fa-lg fb-ic">
                  <MDBIcon fab icon="facebook-f"></MDBIcon>
                </a>
              </MDBCol>
              <MDBBtn href="https://github.com/bahaadabbagh" color="unique">
                GitHub
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="2">
          <MDBCard>
            <MDBCardImage
              hover
              overlay="white-slight"
              className="card-img-top"
              src="https://scontent.fist6-1.fna.fbcdn.net/v/t1.0-9/s960x960/59627672_10157372621791941_8782890533258264576_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=VH8BOYv6DV0AX9UcbtQ&_nc_ht=scontent.fist6-1.fna&_nc_tp=7&oh=0538511685e027a346c576e73c3e9895&oe=5F0C235A"
              alt="Dara"
            />

            <MDBCardBody className="text-center">
              <h5 className="pink-text">Contributor</h5>

              <MDBCardTitle className="card-title">
                <strong>Dara Aldandashi</strong>
              </MDBCardTitle>

              <p className="font-weight-bold blue-text">
                Fron-End Web Developer
              </p>

              <MDBCardText>
                Sed ut perspiciatis unde omnis iste natus sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.{" "}
              </MDBCardText>

              <MDBCol md="12" className="d-flex justify-content-center">
                <a href="!#" className="px-2 fa-lg li-ic">
                  <MDBIcon fab icon="linkedin-in"></MDBIcon>
                </a>

                <a href="!#" className="px-2 fa-lg fb-ic">
                  <MDBIcon fab icon="facebook-f"></MDBIcon>
                </a>
              </MDBCol>
              <MDBBtn href="https://github.com/Dara-D" color="unique">
                GitHub
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}
