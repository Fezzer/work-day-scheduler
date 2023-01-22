"use strict";


// Application initialisation.
$(() => {
  // Gets the settings for the application.
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
    const row = $("<div>")
      .addClass("row")
      .attr("data-hour", hour)
      .append(
        $("<div>")
          .addClass("hour")
          .text(moment(hour, "H").format(settings.getHourFormat()))
    );

    const currentHour = settings.getCurrentHour();
    
    row.append($("<textarea>")
      .addClass(
        hour < currentHour 
          ? "past" 
          : hour > currentHour 
            ? "future" 
            : "present")
      .val(localStorage.getItem("hour"+ hour))
    );
    
    row.append($("<button>").addClass("saveBtn").append(
      $("<i>").addClass("fa-solid fa-floppy-disk")
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
  }
  
  const settings = getSettings();

  setCurrentDay(moment().format(settings.currentDateFormat));

  for (let hour = settings.hours.start; hour <= settings.hours.end; hour++) {
    appendHourRow(hour, settings);
  }

  $("div.container").on("click", "button", saveButtonClick)
});