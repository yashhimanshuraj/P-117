$(document).ready(function () {
  console.log("Ready");

  //  Fetch the current date and update it in the DOM
  let data_time = new Data();
  let current_data = data_time.toLocalDateString();

  $("#data".text("Date:" + current_data));
  $("#button").click(function () {
    let review = $("#text").val();
    console.log(review);

    let input_data = { customer_review: review };
    console.log(review);

    $.ajax({
      url: "/predict",
      type: "POST",
      data: JSON.stringify(input_data),
      dataType: "json",
      contentType: "application/json",
      success: function (result) {
        let prediction = result.prediction;
        let emoji_url = result.url;
        console.log(emoji_url);

        $("#sentiment").text(prediction);
        $("#sentiment").show;

        $("#emoji").attr("src", emoji_url);
        $("#emoji").show;
      },

      error: function (result) {
        console.log(result);
      },
    });
    $("#text").val("");
  });
});
