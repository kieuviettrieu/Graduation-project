import { CardList } from "../../Common/CardList/jsx/CardList";
import React, { useState } from "react";
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

export function Film() {

  const movies = [
    {
      id: 1,
      title: "Tên phim 1",
      genre: "Hành động, Phiêu lưu",
      duration: "120 phút",
      releaseDate: "01/09/2024",
      imageUrl: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202408/11514_103_100003.jpg",
    },
    {
      id: 2,
      title: "Tên phim 2",
      genre: "Kinh dị, Viễn tưởng",
      duration: "105 phút",
      releaseDate: "15/09/2024",
      imageUrl: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202408/11514_104_100004.jpg",
    },
    {
      id: 3,
      title: "Tên phim 3",
      genre: "Tình cảm, Lãng mạn",
      duration: "110 phút",
      releaseDate: "10/09/2024",
      imageUrl: "https://example.com/movie3.jpg",
    },
    {
      id: 4,
      title: "Tên phim 4",
      genre: "Hài hước, Gia đình",
      duration: "95 phút",
      releaseDate: "20/09/2024",
      imageUrl: "https://example.com/movie4.jpg",
    },
    {
      id: 5,
      title: "Tên phim 5",
      genre: "Hành động, Kinh dị",
      duration: "125 phút",
      releaseDate: "05/09/2024",
      imageUrl: "https://example.com/movie5.jpg",
    },
    {
      id: 6,
      title: "Tên phim 6",
      genre: "Hoạt hình, Phiêu lưu",
      duration: "100 phút",
      releaseDate: "12/09/2024",
      imageUrl: "https://example.com/movie6.jpg",
    },
    {
      id: 7,
      title: "Tên phim 7",
      genre: "Khoa học viễn tưởng, Hành động",
      duration: "140 phút",
      releaseDate: "18/09/2024",
      imageUrl: "https://example.com/movie7.jpg",
    },
    {
      id: 8,
      title: "Tên phim 8",
      genre: "Kinh dị, Siêu nhiên",
      duration: "130 phút",
      releaseDate: "25/09/2024",
      imageUrl: "https://example.com/movie8.jpg",
    },
    {
      id: 9,
      title: "Tên phim 9",
      genre: "Tâm lý, Chính kịch",
      duration: "115 phút",
      releaseDate: "08/09/2024",
      imageUrl: "https://example.com/movie9.jpg",
    },
    {
      id: 10,
      title: "Tên phim 10",
      genre: "Lịch sử, Chiến tranh",
      duration: "150 phút",
      releaseDate: "30/09/2024",
      imageUrl: "https://example.com/movie10.jpg",
    },
    {
      id: 11,
      title: "Tên phim 11",
      genre: "Phiêu lưu, Thần thoại",
      duration: "135 phút",
      releaseDate: "02/10/2024",
      imageUrl: "https://example.com/movie11.jpg",
    },
    {
      id: 12,
      title: "Tên phim 12",
      genre: "Hài hước, Phiêu lưu",
      duration: "90 phút",
      releaseDate: "12/10/2024",
      imageUrl: "https://example.com/movie12.jpg",
    },
    {
      id: 13,
      title: "Tên phim 13",
      genre: "Hành động, Tội phạm",
      duration: "120 phút",
      releaseDate: "15/10/2024",
      imageUrl: "https://example.com/movie13.jpg",
    },
    {
      id: 14,
      title: "Tên phim 14",
      genre: "Kinh dị, Tâm lý",
      duration: "105 phút",
      releaseDate: "18/10/2024",
      imageUrl: "https://example.com/movie14.jpg",
    },
    {
      id: 15,
      title: "Tên phim 15",
      genre: "Thể thao, Tâm lý",
      duration: "115 phút",
      releaseDate: "25/10/2024",
      imageUrl: "https://example.com/movie15.jpg",
    },
    {
      id: 16,
      title: "Tên phim 16",
      genre: "Hành động, Phiêu lưu",
      duration: "110 phút",
      releaseDate: "30/10/2024",
      imageUrl: "https://example.com/movie16.jpg",
    },
    {
      id: 17,
      title: "Tên phim 17",
      genre: "Khoa học viễn tưởng, Phiêu lưu",
      duration: "125 phút",
      releaseDate: "01/11/2024",
      imageUrl: "https://example.com/movie17.jpg",
    },
    {
      id: 18,
      title: "Tên phim 18",
      genre: "Hoạt hình, Gia đình",
      duration: "95 phút",
      releaseDate: "10/11/2024",
      imageUrl: "https://example.com/movie18.jpg",
    },
    {
      id: 19,
      title: "Tên phim 19",
      genre: "Kinh dị, Hành động",
      duration: "130 phút",
      releaseDate: "15/11/2024",
      imageUrl: "https://example.com/movie19.jpg",
    },
    {
      id: 20,
      title: "Tên phim 20",
      genre: "Tâm lý, Chính kịch",
      duration: "120 phút",
      releaseDate: "20/11/2024",
      imageUrl: "https://example.com/movie20.jpg",
    },
  ];

  const [items, setItems] = useState([
    {
      key: "1",
      label: "Phim đang chiếu",
      children: <CardList movies={movies}/>,
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
    <div>
      <Tabs
        items={items}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext
            sensors={[sensor]}
            onDragEnd={onDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={items.map((i) => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps}>
                {(node) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />
    </div>
  );
}
