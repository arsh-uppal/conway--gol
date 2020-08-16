import React from "react";

const InfoCard = () => {
  return (
    <div class="container">
      <h3>
        <b>Conway's Game of Life</b>
      </h3>
      <h4>Rules</h4>
      <ol>
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <br />
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <br />
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <br />
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
      </ol>
      <br />
      <p>(Select some cells and press start)</p>
      <span>More at: </span>
      <a
        target="_blank"
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
      >
        wiki
      </a>
    </div>
  );
};

export default InfoCard;
