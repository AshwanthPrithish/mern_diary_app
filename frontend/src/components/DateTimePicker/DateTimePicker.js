import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({ onChange }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleChange = (date) => {
    setSelectedDateTime(date);
    onChange(date);
  };

  const disableFutureDates = (date) => {
    const currentDate = new Date();
    return date <= currentDate;
  };

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={handleChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      filterTime={(time) => {
        const currentDate = new Date();
        const selectedDate = selectedDateTime || currentDate;
        return (
          time.getHours() <= currentDate.getHours() ||
          (time.getHours() === currentDate.getHours() &&
            time.getMinutes() <= currentDate.getMinutes()) ||
          (time.getHours() === currentDate.getHours() &&
            time.getMinutes() === currentDate.getMinutes() &&
            time.getDate() <= selectedDate.getDate())
        );
      }}
      filterDate={disableFutureDates}
      openToDate={new Date()}
    />
  );
};

export default DateTimePicker;
