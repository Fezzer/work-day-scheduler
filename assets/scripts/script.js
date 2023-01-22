"use strict";

$(document).ready(() => {
  // Gets the settings for the application.
  function getSettings() {
    // Properties in the config object can be edited to change the behaviour of the application.
    var config = {
      use24Hour: false, // Whether or not to use the 24 hour clock for the hour display.
      dummyHour: 13, // Used to test the styling of the hour rows, use "null" to use the current time or an integer specifying the hour to use.
      startHour: 8, // The first hour in the day to display.
      endHour: 18, // The last hour in the day to display.
      currentDateFormat: "dddd, Do MMMM YYYY" // The format of the date-time string in the jumbotron.
    };

    return {
      hours: { start: config.startHour, end: config.endHour },
      currentDateFormat: config.currentDateFormat,
      hourFormat: config.use24Hour ? "H" : "ha",
      currentHour: config.dummyHour ? config.dummyHour :  moment().hour()
    };
  }

  // Sets the current day element in the UI to the specified value.
  function setCurrentDay(currentDay) {
    $("#currentDay").text(currentDay);
  }

  // Appends a new hour row to the "container" class.
  function appendHourRow(hour, settings) {
    const row = $("<div>")
      .addClass("row")
      .attr("data-hour", hour)
      .append(
        $("<div>")
          .addClass("hour")
          .text(moment(hour, "H").format(settings.hourFormat))
    );

    const currentHour = settings.currentHour;
    
    row.append($("<textarea>")
      .addClass(
        hour < currentHour 
          ? "past" 
          : hour > currentHour 
            ? "future" 
            : "present")
      .val(localStorage.getItem("hour"+ hour))
    );
    
    row.append($("<button>")
      .addClass("saveBtn")
      .append(
        $("<i>")
          .addClass("fa-solid fa-floppy-disk")
    ));

    $(".container").append(row);
  }

  // Handler for the save button click event.
  function saveButtonClick(event) {
    const button = $(event.currentTarget);
    const hour = button.parent().attr("data-hour");
    const text = button.siblings("textarea").val().trim();
    
    if (text === "") {
      localStorage.removeItem("hour" + hour);
    } else {
      localStorage.setItem("hour" + hour, text);
    }

    $(".toast").toast("show");
  }

  // Application initialisation.
  function init() {
    const settings = getSettings();

    setCurrentDay(moment().format(settings.currentDateFormat));

    for (let hour = settings.hours.start; hour <= settings.hours.end; hour++) {
      appendHourRow(hour, settings);
    }

    $("div.container").on("click", "button", saveButtonClick)
  }

  init();
});