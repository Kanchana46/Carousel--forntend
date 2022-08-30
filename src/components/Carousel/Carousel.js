import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./carousel.css";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Title from '../Title/Title';

const Carousel = ({ slides, infinite }) => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [slidesData, setSlidesData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            console.log(slides, infinite)
            const response = await fetchPosts(Number(slides));
            setSlidesData(response.data.slides)
        }
        fetchData();
    }, [])

    const handleMove = (direction) => {
        let newSlideNo;
        if (direction === "l") {
            newSlideNo = slideNumber === 0 ? Number(slides) : slideNumber - 1;
        } else {
            newSlideNo = slideNumber === Number(slides) ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSlideNo);
    }

    return (
        <div className="slider">
            {(infinite == "true" || slideNumber !== 0) && <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
            />}
            <div className="sliderWrapper">
                <img src={slidesData[slideNumber]?.image} alt="" className="sliderImg" />
                <div style={{ position: "absolute", color: "white" }}>
                    <Title title="title" text={slidesData[slideNumber]?.title} />
                    <Title title="subtitle" text={slidesData[slideNumber]?.subTitle} />
                </div>

            </div>
            {(infinite == "true" || slideNumber !== slidesData.length - 1) && <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => { handleMove("r") }}
            />}
        </div>
    )
}

export default Carousel;