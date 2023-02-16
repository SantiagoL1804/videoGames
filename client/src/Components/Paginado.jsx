import React from "react";
import "./Paginado.css";

export default function Paginado({
  videogames,
  gamesPerPage,
  paginado,
  prevNext,
  currentPage,
}) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(videogames / gamesPerPage); i++) {
    pageNumber.push(i + 1);
  }
  return (
    <nav>
      <ul className="numbers">
        {videogames > 0 && (
          <button
            disabled={currentPage === 1}
            name="prev"
            onClick={(e) => prevNext(e)}
            className={`${currentPage === 1 ? "disabled" : "number"}`}
          >
            Anterior
          </button>
        )}
        {pageNumber?.map((page) => {
          return (
            <li
              onClick={() => paginado(page)}
              key={page}
              className={`${currentPage === page ? "actualNumber" : "number"}`}
            >
              {page}
            </li>
          );
        })}
        {videogames > 0 && (
          <button
            name="next"
            onClick={(e) => prevNext(e)}
            disabled={currentPage === pageNumber.length}
            className={`${
              currentPage === pageNumber.length ? "disabled" : "number"
            }`}
          >
            Siguiente
          </button>
        )}
      </ul>
    </nav>
  );
}
