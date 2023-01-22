"use strict";

// gets the settings for the application.
function getSettings() {
  return {
    hours: { start: 8, end: 18 },
    use24Hour: true,
    dummyHour: 13,
    currentDateFormat: "dddd, Do MMMM YYYY",

    getHourDisplayFormat() { 
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

// Application initialisation.
$(() => {
  const settings = getSettings();
  const currentHour = settings.getCurrentHour();

  setCurrentDay(moment().format(settings.currentDateFormat));

  for (let i = settings.hours.start; i <= settings.hours.end; i++) {
    const row = $("<div>").addClass("row").append(
      $("<div>").addClass("hour").text(moment(i, "H").format(settings.getHourDisplayFormat()))
    );
    
    row.append($("<textarea>").addClass(
      i < currentHour 
        ? "past" 
        : i > currentHour 
            ? "future" 
            : "present"
    ));
    
    row.append($("<button>").addClass("saveBtn").append(
      $("<i>").addClass("fa-solid fa-floppy-disk")
    ));

    $(".container").append(row);
  }
});