import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment"; // Import moment library

export default function PersoPriseDeVisite() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [exception, setException] = useState(null);
  const [jourdedispo, setjourdedispo] = useState(null);



  const handleDateSelect = (date) => {
    setTimeSlots(null);
    setSelectedDate(date);
    const formattedDate = moment(date).format("YYYY-MM-DD"); // Use moment to format the date
    console.log(formattedDate);
    fetch('http://192.168.10.174:3000/disponibilites/dateSearch/64cccc590fd39de6f4a550da', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateOfVisit: formattedDate })
    })
      .then(response => response.json())
      .then(data => {console.log('test',data.data);
        if(data.data) {
        setjourdedispo(data.data[0].dayOfWeek)
        setStartTime(data.data[0].startTimeDispo)
        setEndTime(data.data[0].endTimeDispo)
        setException(data.data[0].Exception)
        generateTimeSlots(data.data[0].startTimeDispo, data.data[0].endTimeDispo);
    } else {console.log('impossible')}
      }) 
      // Function to generate time slots
      const generateTimeSlots = (start, end) => {
          const startTimeMoment = moment(start, 'HH:mm');
          const endTimeMoment = moment(end, 'HH:mm');
          const timeSlotsArray = [];
      
          while (startTimeMoment.isSameOrBefore(endTimeMoment)) {
            timeSlotsArray.push({ startTime: startTimeMoment.format('HH:mm') });
            startTimeMoment.add(30, 'minutes');
          }
      
          setTimeSlots(timeSlotsArray);
        };
  };



      return (
        <View style={styles.container}>
          <Text style={styles.label}>Select a date:</Text>
          <Calendar
            markedDates={{
              [moment(selectedDate).format("YYYY-MM-DD")]: { // Use moment to format the marked date
                selected: true,
                selectedColor: "#47AFA5",
              },
            }}
            onDayPress={(day) => handleDateSelect(new Date(day.dateString))}
          />
          <Text style={styles.label}>Available time slots:</Text>
          {timeSlots ? (
            timeSlots.map((timeSlot) => (
              <Text key={timeSlot.startTime}>{timeSlot.startTime}</Text>
            ))
          ) : (
            <Text>No time slots available for this date.</Text>
          )}
        </View>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
