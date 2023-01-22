"use strict";

// gets the settings for the application.
function getSettings() {
  return {
    hours: { start: 8, end: 18 },
    use24Hour: true,
    dummyHour: 13,
    currentDateFormat: "dddd, Do MMMM YYYY",

    getHourFormat() { 
      return this.use24Hour ? "H" : "ha";
    },

    getCurrentHour() {
      return this.dummyHour ? this.dummyHour :  moment().hour();
    }
  };
}

// Sets the current day element in the UI to the specified value.
function setCurrentDay(currentDay) {
  $("#currentDay").text(currentDay);
}

// appends a new hour row to the "container" class.
function appendHourRow(hour, settings) {
  const row = $("<div>").addClass("row").append(
    $("<div>").addClass("hour").text(moment(hour, "H").format(settings.getHourFormat()))
  );

  const currentHour = settings.getCurrentHour();
  
  row.append($("<textarea>").addClass(
    hour < currentHour 
      ? "past" 
      : hour > currentHour 
          ? "future" 
          : "present"
  ));
  
  row.append($("<button>").addClass("saveBtn").append(
    $("<i>").addClass("fa-solid fa-floppy-disk")
  ));

  $(".container").append(row);
}

// Application initialisation.
$(() => {
  const settings = getSettings();

  setCurrentDay(moment().format(settings.currentDateFormat));

  for (let hour = settings.hours.start; hour <= settings.hours.end; hour++) {
    appendHourRow(hour, settings);
  }
});