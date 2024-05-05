//? This script is directly linked to the HTML so it works

function addBreak(el) {
  console.log("addbreak");
  var textarea = el;
  var matches = textarea.value.split(/\n|\s\n/);
  textarea.value = matches.join("<br>\n") + "<br>";
}

//# Creating a Note
$("#cnotebtn").on("click", () => {
  var cTitle = $("#cnotetitle"); // Caching the New note input field
  var cText = $("#cnotetxt");
  $.ajax({
    url: "/api/v1/notes",
    method: "POST", // In some places type is used instead of method which is an alias used for older versions of jQuery
    contentType: "application/json",
    data: JSON.stringify({ title: cTitle.val(), text: cText.val() }),
    // Function to run upon the success of the ajax
    success: (res) => {
      console.log("create note response received");
      console.log(res);
      cTitle.val(""); // Emptying the Create note fields
      cText.val("");
      addBlur();
      readNote();
    },
  });
});

//# Read or Getting Note
const readNote = () => {
  console.log("read note request sent");
  //An ajax request to the provided URL is made
  $.ajax({
    url: "/api/v1/notes",
    contentType: "application/json", // The request will be sent in json format
    success: (res) => {
      var noteDisplay = $("div.notedisplay"); // Caching the HTML element for ease of use
      noteDisplay.html(""); // Empty the html element in case there is something in it
      // The fuction is executed for each object in the array in that order
      // Here the response variable brings the data sent from the server
      // The products array from the data is filterd and each object is termed a product
      // for Each product the fuction is executed
      // console.log(res);
      res.data.forEach((note) => {
        let brText = note.text.replace(/>>/g, "</br>>>"); // To mimic bullets formating option
        // Appending some HTML, this jQuery method is
        // apparantly slower than pure JS, but
        // we'll need some more facts to do it efficiently
        noteDisplay.append(
          `<div class="container jotstyle">
          <h5 class="ntitle">` +
            note.title +
            `</h5>
          <p class="ntext">` +
            brText +
            `</p>
          <p class="nID d-none">` +
            note._id +
            `</p>
            <button title="Edit" class="enotebtn btn btn-dark"><i class="fas fa-pen"></i></button>
            <button title="Cancel" class="cnotebtn btn btn-dark inActive"><i class="fas fa-times-circle"></i></button>
            <button title="Update" class="unotebtn btn btn-success inActive"><i class="fas fa-check-circle"></i></button>
            <button title="Delete" class="dnotebtn btn btn-danger inActive"><i class="fas fa-trash-alt"></i></button>
          </div>`
        );
      });
      // html($('.ntext').text().replace(/>>/g, '<br/>'))
    },
  });
};

//# Updating (put) a note

$(document).on("click", ".unotebtn", function () {
  let fID = $(this).siblings("p.nID");
  let fTitle = $(this).siblings("h5.ntitle");
  let fText = $(this).siblings("p.ntext");
  let uBtn = $(this);
  let eBtn = $(this).siblings(".enotebtn");
  let cBtn = $(this).siblings(".cnotebtn");
  let dBtn = $(this).siblings(".dnotebtn");
  let uID = fID.text();
  console.log(uID);
  console.log(fTitle.text());
  console.log(fText.text());
  $.ajax({
    url: "/api/v1/note/" + uID,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify({ title: fTitle.text(), text: fText.text() }),
    success: function (res) {
      console.log(res);
      readNote();
      fTitle.attr("contenteditable", "false");
      fText.attr("contenteditable", "false");
      cBtn.fadeOut("fast");
      dBtn.fadeOut("fast");
      uBtn.fadeOut("fast", () => eBtn.slideDown("fast"));
    },
  });
});

//# Deleting a note
$(document).on("click", ".dnotebtn", function () {
  let dID = $(this).siblings("p.nID").text();
  console.log(dID);

  $.ajax({
    url: "/api/v1/note/" + dID,
    method: "DELETE",
    contentType: "application/json",
    success: (res) => {
      console.log(res);
      readNote();
    },
  });
});

let addFocus = () => {
  $("#cnotetxt").slideDown("fast");
};
let addBlur = () => {
  $("#cnotetxt").slideUp("fast");
};

$("#rnotebtn").on("click", () => {
  readNote();
  addBlur();
});

$(document).on("click", ".enotebtn", function () {
  $(this).siblings("h5.ntitle").attr("contenteditable", "true");
  $(this).siblings("p.ntext").attr("contenteditable", "true");
  $(this).fadeOut("fast", () => {
    $(this).siblings(".dnotebtn").slideDown("fast");
    $(this).siblings(".unotebtn").slideDown("fast");
    $(this).siblings(".cnotebtn").slideDown("fast");
  });
});

$(document).on("click", ".cnotebtn", function () {
  $(this).siblings("h5.ntitle").attr("contenteditable", "false");
  $(this).siblings("p.ntext").attr("contenteditable", "false");
  $(this).siblings(".unotebtn").fadeOut("fast");
  $(this).siblings(".dnotebtn").fadeOut("fast");
  $(this).fadeOut("fast", () => {
    $(this).siblings(".enotebtn").slideDown("fast");
  });
});

$(() => {
  console.log("document onload functions");
  readNote(); // Executing readNote on document load
});
