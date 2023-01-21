"use strict";

$(() => {
  const hours = { start: 8, end: 18 };

  $(currentDay).text(moment().format("dddd, Do MMMM YYYY"));

  const currentHour = 13; // moment().hour();

  for (let i = hours.start; i <= hours.end; i++) {
    const row = $("<div>").addClass("row");
    
    row.append($("<div>").addClass("hour").text(i));
    
    row.append($("<textarea>").addClass(
      i < currentHour 
        ? "past" 
        : i > currentHour 
            ? "future" 
            : "present"));
    
    row.append($("<button>").addClass("saveBtn").append(
      $("<i>").addClass("fa-solid fa-floppy-disk")
    ));

    $(".container").append(row);
  }
});