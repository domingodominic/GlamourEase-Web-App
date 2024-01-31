import logo from "../../images/logo.png";
import hairService from "../../images/hair.jpg";
import nailService from "../../images/nails.jpg";
import "../../scss/style.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../../images/img.png";
import {
  BsChevronRight,
  BsGithub,
  BsFacebook,
  BsLinkedin,
  BsInstagram,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import React, { useRef, useState } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import makeupService from "../../images/makeup.jpg";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="welcome--container">
        <header className="header">
          <div className="logo">GLAMOUR EASE.</div>
          <ul className="nav--list">
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>

            <li>
              <a href="#">Partners</a>
            </li>
            <li>
              <a href="#">Contacts</a>
            </li>
          </ul>
        </header>
        <section className="section--container">
          <div className="section--container--bg"></div>
          <div className="content">
            <h1 className="content--promotion">
              Promote | Find your beauty services by GlamourEase now.
            </h1>
            <p style={{ color: "gray", fontSize: "15px" }}>
              We find the perfect services tailored to your preferences and we
              empower independent beauty service providers to thrive and expand
              their businesses
            </p>
            <button className="fadein--btn" onClick={() => navigate("/login")}>
              Get Started
            </button>
          </div>
          <div className="img">
            <img src={image} />
          </div>
        </section>
      </div>
      <section
        className="other--section"
        style={{ maginTop: "0px !important" }}
      >
        <div className="other--content">
          <p>Discover</p>
          <h1>
            Are you a independent beauty services business owner? We help you
            grow your business!
          </h1>
          <p>
            Enhance your business and streamline the scheduling process for both
            you and your customers, allowing them to conveniently book
            appointments at their preferred times
          </p>
          <div className="btns">
            <button className="explore--btn fadein--btn">Explore</button>
          </div>
        </div>
      </section>
      <section className="about" id="about">
        <div className="about--content">
          <div>
            <p className="discover">Discover</p>
            <h1>
              Transform your look with our beauty independent services
              businesses owner
            </h1>
            <p>
              At Beauty Services, we offer a wide range of treatments and
              services designed to enhance your natural beauty. Wheter you're
              looking for a relaxing massage, a rejuvenating facial, or a
              stunning makeover, our independent business beauty services are
              ready to help you look and feel at your best.
            </p>
            <div className="btns">
              <button className="fadeout--btn">Learn More</button>
              <button className="fadein--btn">
                Sign Up <BsChevronRight style={{ fontWeight: "bold" }} />
              </button>
            </div>
          </div>
        </div>
        <div className="about--img">
          <div className="img"></div>
        </div>
      </section>

      <section className="services" id="services">
        <h1>Discover our Beauty services</h1>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nailService}
                title="nail services"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#ff9a9c", fontFamily: "semi-bold" }}
                >
                  Nails Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={hairService}
                title="hair services"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#ff9a9c", fontFamily: "semi-bold" }}
                >
                  Hair Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={makeupService}
                title="make up services"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#ff9a9c", fontFamily: "semi-bold" }}
                >
                  Makeup Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nailService}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#ff9a9c", fontFamily: "semi-bold" }}
                >
                  Nails Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={nailService}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#ff9a9c", fontFamily: "semi-bold" }}
                >
                  Nails Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={makeupService}
                title="make up services"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ color: "#ff9a9c", fontFamily: "semi-bold" }}
                >
                  Makeup Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="other--section">
        <div className="other--content">
          <p>Discover</p>
          <h1>
            Are you a independent beauty services business owner? We help you
            grow your business!
          </h1>
          <p>
            Enhance your business and streamline the scheduling process for both
            you and your customers, allowing them to conveniently book
            appointments at their preferred times
          </p>
          <div className="btns">
            <button className="explore--btn fadein--btn">Explore</button>
          </div>
        </div>
      </section>
      <section className="contact">
        <div className="contact--container">
          <div className="contact--logo">
            <img src={logo} />
          </div>
          <ul className="contact-nav-list">
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>

            <li>
              <a href="#">Partners</a>
            </li>
            <li>
              <a href="#">Contacts</a>
            </li>
          </ul>
          <ul className="contact-socmed-list">
            <li>
              <a href="#">
                <BsGithub />
              </a>
            </li>
            <li>
              <a href="#">
                <BsFacebook />{" "}
              </a>
            </li>

            <li>
              <a href="#">
                <BsInstagram />
              </a>
            </li>
            <li>
              <a href="#">
                <BsLinkedin />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              color: "#191444",
            }}
          >
            <p>&copy; 2023 GlamourEase. All Rights Reserved.</p>
            <a href="#">Privacy Policy</a>
            <a href="#"> Terms and conditions</a>
            <a href="#"> Cookie Policy</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
