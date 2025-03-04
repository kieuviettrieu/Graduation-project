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
import '../Contents/Film.css'
import { API_Film } from "../../Home/jsx/Constant";
import { callAPI } from "../../axios/axiosInstance";
import { useLoading } from "../../../LoadingProvider";

const DraggableTabNode = ({ className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  });
  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
  };
  return React.cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const Film = () => {
  const [moviesReal, setMoviesReal] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieData = await callAPI("get", API_Film.showingMovies);
        setMoviesReal(movieData); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const [items, setItems] = useState([
    {
      key: "1",
      label: "Phim đang chiếu",
      children: <CardList movies={moviesReal}/>,
    },
    // {
    //   key: "2",
    //   label: showingMovies.title,
    //   children: <CardList movies={showingMovies.data}/>,
    // },
    // {
    //   key: "3",
    //   label: upcomingMovies.title,
    //   children: <CardList movies={upcomingMovies.data}/>,
    // },
  ]);



  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <div className='auto-container'>
      <CardList movies={moviesReal}/>
    </div>
  );
}

export default Film;
