import * as React from "react";
import { Card } from "./Card";
import "../Content/CardList.css";

export function CardList(props) {
  return (
    <>
      <section className="card-section">
        <div className="content">
          {props.movies.slice(0, 10).map((item) => (
            <Card data={item} />
          ))}
        </div>
      </section>
    </>
  );
}
