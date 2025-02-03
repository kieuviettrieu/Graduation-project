import * as React from "react";
import Card from "./Card";
import "../Content/index.css";

export function CardList(props) {
  console.log(props.movies, "props.movies")
  return (
    <>
      <section className="card-section">
        <div className="content">
          {props.movies.map((item, index) => (
            <Card data={item} key={item?.id ?? index}/>
          ))}
        </div>
      </section>
    </>
  );
}
