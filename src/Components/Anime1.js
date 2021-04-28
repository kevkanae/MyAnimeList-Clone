import { useMainStyles } from "../Styles/Anime1Styles";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Progress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { tabList } from "../Constants/TabList";
import { Scrollbars } from "react-custom-scrollbars";
import { GiBarbedStar } from "react-icons/gi";

export default function MainComponent() {
  const classes = useMainStyles();
  const [isLoading, setLoading] = useState(true);
  const [currentTab, setTab] = useState("tv");
  const [array, setAPIArray] = useState([]);

  useEffect(() => {
    const url = `https://api.jikan.moe/v3/top/anime/1/${currentTab}`;
    axios
      .get(url)
      .then((res) => {
        setAPIArray(res.data["top"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentTab]);

  const handleChange = (event) => {
    setTab(event.currentTarget.value);
  };

  return (
    <div className={classes.main}>
      <div className={classes.root}>
        <header className={classes.appbar}>
          {tabList.map((data, index) => {
            return (
              <Button
                onClick={handleChange}
                value={data.val}
                style={{ color: "#f25287" }}
                key={index}
              >
                {data.name}
              </Button>
            );
          })}
        </header>
        <div className={classes.body}>
          {isLoading ? (
            <Progress />
          ) : (
            <Scrollbars>
              {array.map((data, index) => {
                return (
                  <a key={index} href={data["url"]}>
                    <div className={classes.tile}>
                      <div className={classes.imageDiv}>
                        <img
                          className={classes.imageTag}
                          src={data["image_url"]}
                          alt={`${index}`}
                        />
                      </div>
                      <div className={classes.details}>
                        <h1 className={classes.title}>{data["title"]}</h1>
                        <p>
                          {data["type"]}({data["episodes"]} eps)
                        </p>
                        <p>
                          {data["start_date"]} - {data["end_date"]}
                        </p>
                      </div>
                      <div className={classes.score}>
                        <span className={classes.star}>
                          <GiBarbedStar />
                        </span>{" "}
                        <p className={classes.scoreP}>Score: {data["score"]}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </Scrollbars>
          )}
        </div>
      </div>
    </div>
  );
}