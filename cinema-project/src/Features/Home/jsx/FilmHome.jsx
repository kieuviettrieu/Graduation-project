import { CardList } from "../../Common/CardList/jsx/CardList";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tabs } from "antd";
import "../Contents/FilmHome.css";
import { API_Film } from "./Constant";
import { callAPI } from "../../axios/axiosInstance";
import { useLoading } from "../../../LoadingProvider";

const DraggableTabNode = ({ className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props["data-node-key"],
    });
  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
  };
  return React.cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

export function FilmHome() {
  const [moviesReal, setMoviesReal] = useState([]);
  const [isDisplaySuggestion, setIsDisplaySuggestion] = useState(false);
  const { setLoading } = useLoading();
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let apiStr = API_Film.suggession;
        if (activeTab === 1) {
          apiStr = API_Film.showingMovies;
        } else if (activeTab === 2) {
          apiStr = API_Film.upComingg;
        }
        if (activeTab === 0) {
          let suggessionData = await callAPI("get", API_Film.suggession);
          if (suggessionData.length === 0) {
            setIsDisplaySuggestion(false);
            setActiveTab(1);
          } else {
            setIsDisplaySuggestion(true);
            setMoviesReal(suggessionData);
          }
        }
        if (activeTab !== 0) {
          const movieData = await callAPI("get", apiStr);
          setMoviesReal(movieData);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [activeTab]);

  // useEffect(() => {
  //   const newItems = [
  //     {
  //       key: "1",
  //       label: moviesForYou.title,
  //       children: <CardList movies={moviesReal} />,
  //     },
  //     {
  //       key: "2",
  //       label: showingMovies.title,
  //       children: <CardList movies={moviesReal} />,
  //     },
  //     {
  //       key: "3",
  //       label: upcomingMovies.title,
  //       children: <CardList movies={moviesReal} />,
  //     },
  //   ];
  //   setItems(newItems);
  // }, [moviesReal]);

  return (
    <div>
      <div className="mixitup-gallery">
        <ul className="nav nav-tabs">
          {
            isDisplaySuggestion && 
            <li>
              <a
                data-toggle="tab"
                className={activeTab === 0 ? "active" : ""}
                href="#suggest"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(0);
                }}
              >
                Gợi ý
              </a>
            </li>
          }
          <li>
            <a
              data-toggle="tab"
              className={activeTab === 1 ? "active" : ""}
              href="#current"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(1);
              }}
            >
              Phim Đang chiếu
            </a>
          </li>
          <li>
            <a
              data-toggle="tab"
              className={activeTab === 2 ? "active" : ""}
              href="#comming"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(2);
              }}
            >
              Phim Sắp chiếu
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <CardList movies={moviesReal} />
        </div>
      </div>
    </div>
  );
}
