import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useAppointmentStore from "../store/useAppointmentStore";
import { GoSun } from "react-icons/go";
import { WiSunset } from "react-icons/wi";
import "../../scss/style.css";
import { ThemeContext } from "../../App";
import OpenCalendar from "./OpenCalendar";
import useBookingPageClass from "../store/useBookingPageClass";

function SelectTime({ setStep }) {
  const today = new Date();
  const [clickedDateIndex, setClickedDateIndex] = useState(null);
  const [amTime, setAmTime] = useState([]);
  const [pmTime, setPmTime] = useState([]);
  const [dateElements, setDateElements] = useState([]);
  const { chosenService, setTime, setDate } = useAppointmentStore();
  const { theme } = useContext(ThemeContext);
  const { currentClassname } = useBookingPageClass();
  const [calendarState, setCalendarState] = useState(false);
  const [selectedDateinCalendar, setSelectedDateinCalendar] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("chosen service data ", chosenService);

  useEffect(() => {
    const generateDates = () => {
      const currentMonthDates = [];
      const nextMonthDates = [];

      const lastDayOfCurrentMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      const lastDayOfNextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 2,
        0
      );

      for (
        let day = today.getDate();
        day <= lastDayOfCurrentMonth.getDate();
        day++
      ) {
        const date = new Date(today.getFullYear(), today.getMonth(), day);
        currentMonthDates.push(date);
      }

      for (let day = 1; day <= lastDayOfNextMonth.getDate(); day++) {
        const date = new Date(today.getFullYear(), today.getMonth() + 1, day);
        nextMonthDates.push(date);
      }

      const allDates = [...currentMonthDates, ...nextMonthDates];
      setDateElements(allDates);
    };

    generateDates();
  }, []);

  const compareDate = (date, index) => {
    const updatedAmTime = [];
    const updatedPmTime = [];

    chosenService.timeAndDate.forEach((data) => {
      const serviceDate = new Date(data.service_date);
      const formattedServiceDate = serviceDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });

      const selectedDate = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });

      if (formattedServiceDate === selectedDate) {
        const morning = data.availability_time.filter((time) =>
          time.includes("AM")
        );
        const afternoon = data.availability_time.filter((time) =>
          time.includes("PM")
        );

        updatedAmTime.push(...morning);
        updatedPmTime.push(...afternoon);
      }
    });

    setAmTime(updatedAmTime);
    setPmTime(updatedPmTime);
  };

  const compareDateInCalendarDialog = (date) => {
    setSelectedDateinCalendar(date);

    const updatedAmTime = [];
    const updatedPmTime = [];

    chosenService.timeAndDate.forEach((data) => {
      const serviceDate = new Date(data.service_date);
      const formattedServiceDate = serviceDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });

      if (formattedServiceDate === date) {
        const morning = data.availability_time.filter((time) =>
          time.includes("AM")
        );

        const afternoon = data.availability_time.filter((time) =>
          time.includes("PM")
        );
        updatedAmTime.push(...morning);
        updatedPmTime.push(...afternoon);
      }
    });

    setAmTime(updatedAmTime);
    setPmTime(updatedPmTime);
  };
  const handleChosenTime = (time) => {
    setTime(time);
    console.log("the time is", time);
    setStep(4);
  };
  const handleChosenDate = (date) => {
    setDate(date);
  };

  const handleOpenCalendar = () => {
    setCalendarState(true);
  };
  const getSelectedDate = (data) => {};
  return (
    <div className={currentClassname}>
      <div>
        <div className={`mb--municipality`}>
          <h4 className={`title color--${theme} municipality--page--title`}>
            Select Date & Time
          </h4>
          <p style={{ margin: "0", color: "gray" }}>
            Please select date & time.
          </p>
        </div>
        <p onClick={() => handleOpenCalendar()} className="open--calendar">
          Open calendar
        </p>
        <OpenCalendar
          calendarState={calendarState}
          getSelectedDate={getSelectedDate}
          setCalendarState={setCalendarState}
          compareDateInCalendarDialog={compareDateInCalendarDialog}
        />
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={isMobile ? 3 : 5}
          spaceBetween={isMobile ? 5 : 10}
          className="mySwiper swipe"
        >
          {dateElements.map((dateObject, index) => (
            <SwiperSlide
              key={index}
              onClick={() => {
                compareDate(dateObject, index);
                handleChosenDate(dateObject);
              }}
            >
              <div className="date--card--container">
                <div
                  className={`date--card--${theme}`}
                  style={{
                    boxShadow:
                      clickedDateIndex === index
                        ? `inset 0 0 0 2px #ff9a9c`
                        : null,
                  }}
                >
                  <div className={`date--week color--${theme}`}>
                    {dateObject.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="date--day">{dateObject.getDate()}</div>
                  <div className={`date--year color--${theme}`}>
                    {dateObject.getFullYear()}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="time--available--container">
        {amTime.length >= 1 || pmTime.length >= 1 ? (
          <div>
            <div className={`time--container-flex color--${theme}`}>
              <GoSun />
              <p>MORNING</p>
            </div>
            <div className="time--container-flex">
              {amTime.map((time, index) => (
                <div
                  className="available--time--item"
                  key={index}
                  onClick={() => handleChosenTime(time)}
                >
                  {time}
                </div>
              ))}
            </div>

            <div className={`time--container-flex color--${theme}`}>
              <WiSunset />
              <p>AFTERNOON</p>
            </div>

            <div className="time--container-flex">
              {pmTime?.map((time, index) => (
                <div
                  className="available--time--item"
                  key={index}
                  onClick={() => handleChosenTime(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className={`time--unavailable--${theme}`}>No time available</p>
        )}
      </div>
    </div>
  );
}

export default SelectTime;
