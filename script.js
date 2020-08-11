    // Name: David Huynh
    // Email: david_huynh@student.uml.edu
    // Major: C.S (Senior year) in course 91.61 GUI Programming I
    // Date Created: 08/08/2020
    // Short Description: Assigment 7 -  Using the jQuery UI Slider and Tab Widgets
    // Copyright (c) 2020 by David Huynh. All rights reserved

  // document.getElementById('rowStart').value = -50;
  // document.getElementById('rowEnd').value = 50;
  // document.getElementById('colStart').value = -50;
  // document.getElementById('colEnd').value = 50;

function render() {
    let rowStart = Number(document.getElementById('rowStart').value);
    //let rowStart = $('#rowStart').val(); -- Crashing the browser
    let row_finish = Number(document.getElementById('rowEnd').value);
     //let rowEnd = $('#rowEnd').val();
    let colStart = Number(document.getElementById('colStart').value);
    //let colStart = $('#colStart').val();
    let col_finish = Number(document.getElementById('colEnd').value);
    //let colEnd = $('#colEnd').val();

    let colHeader = colStart;
    let rowHeader = rowStart;

    let table = '<table>';

    for (let i = colStart; i <= col_finish + 1; i++) {
        table += '<tr>'; //create one row for table
        for (let j = rowStart; j <= row_finish + 1; j++) {
            if (i == colStart && j == rowStart) {
                //1 corner is empty
                table += '<td>' + '' + '</td>'; //create a cell for table
            } else if (i == colStart) {
                //row header value
                table += "<td class ='header'>" + rowHeader + '</td>';
                rowHeader++;
            } else if (j == rowStart) {
                // column header value
                table += '<td >' + colHeader + '</td>';
                colHeader++;
            } else {
                // The rest of the table items
                if (i % 2 === 0 && j % 2 === 0 || (i % 2 !== 0 && j % 2 !== 0)) {
                    table += "<td class = 'both'>" + ((i - 1) * (j - 1)) + '</td>';
                } else {
                    table += "<td class = 'either'>" + ((i - 1) * (j - 1)) + '</td>';
                }
            }
        }
        table += '</tr>'; // close tab
    }
    table += '</table>'; // close

    document.getElementById('render').innerHTML = ""; // space
    document.getElementById('render').innerHTML = table;  //render table
}


$(function() {

    //call slider function
    addSlider();
    $("#Nav").tabs(); //enable JQUERY UI
    createTabs(); //create tabs to save table
    

     //validation method for ending number > starting number
    $.validator.addMethod("greaterThan", function(value, element, param) {
        let $maximize = $(param);
        if (this.settings.onfocusout) {
             //after out of focus -> run this validation
            $maximize.off(".validate-greaterThan").on("blur.validate-greaterThan", function() {
                $(element).valid();
                //if return valid -> validation of color 
            });
        }
        //if ending number number > Starting number => true, else print the message
        return isNaN(parseInt($maximize.val())) || parseInt(value) >= parseInt($maximize.val());
    }, "Ending # must bigger than starting #");

    //validation method for starting number < ending number
    $.validator.addMethod("lessThan", function(value, element, param) {
        let $minimize = $(param);
        if (this.settings.onfocusout) {
            $minimize.off(".validate-lessThan").on("blur.validate-lessThan", function() {
                $(element).valid();
            });
        }
        //if start number  < end number = > true, else print the message
        return isNaN(parseInt($minimize.val())) || parseInt(value) <= parseInt($minimize.val());
    }, "Starting # must smaller than ending #");

       //Create a validation method for checking integer number
    $.validator.addMethod("isInt", function(value, element) {
        //if is int => true, else print the message
        return ((Number(value)) % 1 === 0);
    }, "Only Accept Integer");

  //   // validation method for checking integer number
  // $.validator.addMethod("largeNumber", function(value, element) {
  //     //if is int -> true, else print the message
  //     return isNaN(parseInt(value)) || (Math.abs(parseInt(value)) <= 1000);
  // }, "Only Accept Integer");

  //   //validation method for checking the range in 100
  //   $.validator.addMethod("checkRange", function(value, element, param) {
  //       let $maximize = $(param);
  //       if (this.settings.onfocusout) {
  //           $maximize.off(".validate-checkRange").on("blur.validate-checkRange", function() {
  //               $(element).valid();
  //               //valid color if return valid
  //           });
  //       }
  //       return isNaN(parseInt(value))|| isNaN(parseInt($maximize.val())) || (Math.abs(parseInt($maximize.val()) - (parseInt(value))) <= 100);
  //   });
    // query attribute "input_form"
    $("form[name='input_form']").validate({
       // validation rules
        rules: {
            rowStart: {
                required: true, //if input is blank, required input 
                number: true,//if Not integer, has to be a number
                isInt: true, // has to be an integer
                lessThan: '#rowEnd', // start number has to be smaller than end number
                min: -10,
                max: 10,
            },
            colStart: {
                required: true,
                number: true,
                isInt: true,
                lessThan: '#colEnd',
                min: -10,
                max: 10,
            },
            rowEnd: {
                required: true,
                number: true,
                isInt: true,
                greaterThan: '#rowStart',
                min: -10,
                max: 10,
            },
            colEnd: {
                required: true,
                number: true,
                isInt: true,
                greaterThan: '#colStart',
                min: -10,
                max: 10,
            }
        },

        // validation error messages
        messages: {
            rowStart: {
                required: "Only Accept Integer", //if input is blank
                number: "Only Accept Integer", //if Not integer
                min: "# Should be an integer bigger than -10",//if out of checkRange
                max: "# Should be an integer smaller than 10",  //if The # is larger than 1000
            },
            rowEnd: {
                required: "Only Accept Integer",
                number: "Only Accept Integer",
                min: "# Should be an integer bigger than -10",
                max: "# Should be an integer smaller than 10",
            },
            colStart: {
                required: "Only Accept Integer",
                number: "Only Accept Integer",
                min: "# Should be an integer bigger than -10",
                max: "# Should be an integer smaller than 10",
            },
            colEnd: {
                required: "Only Accept Integer",
                number: "Only Accept Integer",
                min: "# Should be an integer bigger than -10",
                max: "# Should be an integer smaller than 10",
            },
        },
      // Passed -> render the table
        submitHandler: function(form) {
            render();
        }
    });
});


function IsFormValid() {
    //  inputs are valid = > create the table when all
    if ($("form#input_form").valid() == true) {
        $("form#input_form").submit();
    }
}


//  Create slider and its settings
function addSlider() {
    // slider ui for min row
    //Set min max for slider, 2 way binding
    $("#SliderRowStart").slider({
        min: -10,
        max: 10,
        slide: function(event, ui) {
            $("#rowStart").val(ui.value); //update value to input box
            IsFormValid(); //check for valid input
        }
    }); //change slider if user enter a number to input box
    $("#rowStart").on("keyup", function() {
        IsFormValid(); //check if valid input
        $("#SliderRowStart").slider("value", this.value); //update value if valid value
    });

    $("#SliderRowEnd").slider({
        min: -10,
        max: 10,
        slide: function(event, ui) {
            $("#rowEnd").val(ui.value);
            IsFormValid();
        }
    });
    $("#rowEnd").on("keyup", function() {
        IsFormValid();
        $("#SliderRowEnd").slider("value", this.value);
    });

    $("#SliderColStart").slider({
        min: -10,
        max: 10,
        slide: function(event, ui) {
            $("#colStart").val(ui.value);
            IsFormValid();
        }
    });
    $("#colStart").on("keyup", function() {
        IsFormValid();
        $("#SliderColStart").slider("value", this.value);
    });

    $("#SliderColEnd").slider({
        min: -10,
        max: 10,
        slide: function(event, ui) {
            $("#colEnd").val(ui.value);
            IsFormValid();
        }
    });
    $("#colEnd").on("keyup", function() {
        IsFormValid();
        $("#SliderColEnd").slider("value", this.value);
    });
}

//Create tab on top
function createTabs() {
    $("#delete_button").click(function() {
        //multiple tabs can be deleted simultaneously after click 
        let num_tabs = $('div#Nav ul li.tab').length;
        do {
            $("#child_tab").remove();
            $("#tab_" + num_tabs--).remove();
        } while ($("#Nav li").length > 1);
    });
    $("#submit_button").click(function() {
        // Check valid input before create tab
        if ($("form#input_form").valid() === true) {
            let num_tabs = $('div#Nav ul li.tab').length + 1;
            let rowStart = Number(document.getElementById('rowStart').value);
            let row_finish = Number(document.getElementById('rowEnd').value);
            let colStart = Number(document.getElementById('colStart').value);
            let col_finish = Number(document.getElementById('colEnd').value);
            //make tabs header using input
            //appending list item
            $('ul').append(
                '<li id ="child_tab" class="tab"><a href="#tab_' + num_tabs + '">(' + rowStart + ',' + row_finish + ') ' + '(' + colStart + ',' + col_finish + ')' + '</a>' + "<span class='ui-icon ui-icon-close' role='presentation'></span>" + '</li>');
            //appending the actual tab with the corresponding table
            $('#Nav').append(
                '<div id ="tab_' + num_tabs + '">' + $("#render").html() + '</div>');
            $('#Nav').tabs("refresh");
            // Close icon: removing single the tab
            $('#Nav').on("click", "span.ui-icon-close", function() {
                let panelId = $(this).closest("li").remove().attr("aria-controls");
                $("#" + panelId).remove();
                $("#Nav").tabs("refresh");
            });
        }
    });
}

