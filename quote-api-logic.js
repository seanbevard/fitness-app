//$("#submit").on("click", function() {

      var queryURL = "http://quotes.rest/qod.json?category=sports" 
      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.contents;

          var data = results.quotes[0];

          // Check the object returned
          console.log(data);

          // Get the quote from the object
          console.log(data.quote);

              // Creating a div with the class "item"
              var quoteDiv = $("<div class='item'>");

              // Storing the result item's rating
              var quote = data.quote;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p id='quote-item'>").text(quote);


              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              quoteDiv.append(p);
             

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#quote-display").prepend(quoteDiv);

        });
    //});