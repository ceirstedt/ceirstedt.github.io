document.addEventListener("DOMContentLoaded", function () {
  let table = document.querySelector("#table");
  let texr = document.querySelector("#text");

  let correct_word = "";

  let game_state = "play";

  fetch("./wordlist.json")
    .then((response) => response.json())
    .then((data) => {
      let wordsList = data["words"];
      correct_word = wordsList[Math.floor(Math.random() * wordsList.length)];
      console.log("correct word:", correct_word);
    })
    .catch((error) => {
      console.error("Error fetching JSON file:", error);
    });

  const alphabet = Array.from(Array(26)).map((e, i) =>
    String.fromCharCode(i + 97),
  );

  function win(num, word) {
    text.innerHTML += "<p>It was " + word + "!</p>";
    text.innerHTML += "<p>You won in " + num + "!</p>";
  }
  
  function lose(word) {
    text.innerHTML += "<p>Nope!";
    text.innerHTML += "The correct word was " + word + "!</p>";
    text.style.color = "#FFC300";
  }

  let rows = [];
  let row_count = 0;
  let max_rows = 6;

  // create initial empty grid
  for (let i = 0; i < 6; i++) {
    // add row
    table.innerHTML += "<tr id=" + "row_" + row_count + "></tr>";
    let current_row = document.querySelector("#row_" + row_count);
    let cells = [];

    // add cells to row
    for (let i = 0; i < 5; i++) {
      current_row.innerHTML +=
        "<td id=" + '"row_' + row_count + "_cell_" + i + '"></td>';
      cells[i] = document.querySelector("#row_" + row_count + "_cell_" + i);
    }
    rows[row_count] = cells;
    row_count++;
  }

  let guess = "";
  let cell_selected = 0;
  let row_selected = 0;

  let ruled_out = [];

  let current_cell = document.querySelector(
    "#row_" + row_selected + "_cell_" + cell_selected,
  );

  document.addEventListener("keydown", (event) => {
    // Get the pressed key
    const key = event.key.toLowerCase();
    console.log("Key pressed:", key);

    if (game_state == "play") {
      current_cell = document.querySelector(
        "#row_" + row_selected + "_cell_" + cell_selected,
      );

      // Do something with the key
      if (alphabet.includes(key)) {
        if (cell_selected < 5 && !ruled_out.includes(key)) {
          guess += key;
          current_cell.innerHTML = key;
          cell_selected += 1;
        }
        if (cell_selected == 5) {
          for (let i = 0; i < 5; i++) {
            if (guess[i] == correct_word[i]) {
              document.querySelector(
                "#row_" + row_selected + "_cell_" + i,
              ).style.color = "#1abc9c";
            } else if (correct_word.includes(guess[i])) {
              document.querySelector(
                "#row_" + row_selected + "_cell_" + i,
              ).style.color = "#FFC300";
            } else if (!correct_word.includes(guess[i])) {
              ruled_out += guess[i];
            }
          }
          if (guess == correct_word) {
            game_state = "win";
            win(row_selected + 1, guess);
          } else if (row_selected == 5) {
            game_state = "lose";
            lose(correct_word);
          }

          row_selected++;
          cell_selected = 0;
          guess = "";
        }
        console.log("Cell selected:", cell_selected);
        console.log("Guess:", guess);
      }

      if (key == "backspace") {
        if (cell_selected > 0) {
          cell_selected -= 1;
          current_cell = document.querySelector(
            "#row_" + row_selected + "_cell_" + cell_selected,
          );
          current_cell.innerHTML = " ";
          guess = guess.slice(0, -1);
        }

        if (cell_selected <= 0) {
          guess = "";
          cell_selected = 0;
          current_cell = document.querySelector(
            "#row_" + row_selected + "_cell_" + cell_selected,
          );
          current_cell.innerHTML = " ";
        }

        console.log("Cell selected:", cell_selected);
        console.log("Guess:", guess);
      }
    }
  });
});
