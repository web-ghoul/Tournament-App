import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleToastMessage } from "../../App";

//Images
import gameImg from "../../static/images/game-img-1.jpg";
import kingImg from "../../static/images/king.png";

//MUI
import { Box, Divider, IconButton, Typography } from "@mui/material";
import {
  ContentCopyRounded,
  DeleteForeverRounded,
  HourglassBottomRounded,
  HourglassEmptyRounded,
  HourglassTopRounded,
} from "@mui/icons-material";
import { MyButton } from "../../MUIComponents/MyButton/MyButton";

//Style
import styles from "./TournamentCard.module.css";
import { getTournaments } from "../../store/slices/tournamentsSlice";
import BasicLoading from "../BasicLoading/BasicLoading";

const TournamentCard = ({ tournament, finished }) => {
  const { username, role, signed } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exist, setExist] = useState(false);

  const [buttonType, setButtonType] = useState("join");

  const handleTournamentDateAndTime = (targetDate) => {
    const calender = new Date(
      new Date(targetDate).setHours(new Date(targetDate).getHours() + 3)
    )
      .toISOString()
      .split("T");
    const time = calender[1].split(".")[0];
    const date = calender[0];
    return { date, time };
  };

  const joinEndDate =
    tournament &&
    handleTournamentDateAndTime(
      new Date(new Date(tournament.StartsAt).getTime() - 5 * 1000 * 60)
    ).date;

  const joinEndTime =
    tournament &&
    handleTournamentDateAndTime(
      new Date(new Date(tournament.StartsAt).getTime() - 5 * 1000 * 60)
    ).time;

  const startDate =
    tournament && handleTournamentDateAndTime(tournament.StartsAt).date;

  const startTime =
    tournament && handleTournamentDateAndTime(tournament.StartsAt).time;

  const endDate =
    tournament &&
    handleTournamentDateAndTime(
      finished ? tournament.EndedAt : tournament.StartsAt
    ).date;

  const endTime =
    tournament &&
    handleTournamentDateAndTime(
      finished ? tournament.EndedAt : tournament.StartsAt
    ).time;

  const handleJoin = async () => {
    if (!signed) {
      handleToastMessage("Create Account First To Join Tournament", "i");
      return;
    }
    await axios
      .post(
        process.env.REACT_APP_SERVER_URL + `/JoinTournament/${tournament._id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.message === "Tournament is Full !") {
          handleToastMessage(res.data.message, "i");
        } else {
          handleToastMessage(res.data.message, "s");
        }
        dispatch(getTournaments());
        setExist(true);
      })
      .catch((err) => {
        try {
          handleToastMessage(err.response.data.message, "e");
          setExist(false);
        } catch (error) {
          handleToastMessage(error, "e");
        }
      });
  };

  const handleEnter = async () => {
    await axios
      .post(
        process.env.REACT_APP_SERVER_URL + `/EnterTournament/${tournament._id}`
      )
      .then((res) => {
        if (tournament.Type === "Points") {
          navigate(`../points/${tournament._id}`);
        } else {
          navigate(`../brackets/${tournament._id}`);
        }
        handleToastMessage(`Welcome ${username}`, "s");
      })
      .catch((err) => {
        try {
          handleToastMessage(err.response.data.message, "e");
        } catch (error) {
          handleToastMessage(error, "e");
        }
      });
  };

  const handleView = async () => {
    if (tournament.Type === "Points") {
      navigate(`../points/${tournament._id}`);
    } else {
      navigate(`../brackets/${tournament._id}`);
    }
  };

  const handleDelete = async () => {
    if (!signed) {
      handleToastMessage("Log in First To Delete Tournament", "i");
      return;
    }
    await axios
      .delete(
        process.env.REACT_APP_SERVER_URL +
          `/Admin/deleteTournament/${tournament._id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(getTournaments());
        handleToastMessage(res.data.message, "s");
      })
      .catch((err) => {
        try {
          handleToastMessage(err.response.data.message, "e");
        } catch (error) {
          handleToastMessage(error, "e");
        }
      });
  };

  const handleCopyJoinLink = () => {
    navigator.clipboard.writeText(
      `https://chess-tournament.onrender.com/join/${tournament._id}`
    );
    handleToastMessage("Join Link Copied", "s");
  };

  useEffect(() => {
    if (tournament) {
      if (tournament.Players.includes(username)) {
        setExist(true);
        setButtonType("enter");
      } else {
        setExist(false);
        if (new Date(tournament.StartsAt) <= new Date()) {
          setButtonType("view");
        } else {
          setButtonType("join");
        }
      }
    }
  }, [tournament, exist, finished, username]);

  return !tournament ? (
    <BasicLoading />
  ) : (
    <Box className={`grid-stretch ${styles.tournament}`}>
      <Box className={`grid-between ${styles.tour}`}>
        {finished ? (
          <Box className={`flex-center ${styles.winner_img}`}>
            <Box
              component="img"
              className={`${styles.img}`}
              alt="winner tournament"
              src={gameImg}
            />
            <Box className={`grid0-center ${styles.winner}`}>
              <Box
                component="img"
                className={styles.winner_crown}
                alt="winner crown"
                src={kingImg}
              />
              <Link
                to={`/profile/${tournament.Winner}`}
                className={styles.winner_name}
              >
                <Typography variant="h4" color="inherit">
                  {tournament.Winner}
                </Typography>
              </Link>
            </Box>
          </Box>
        ) : (
          <Box
            component="img"
            className={styles.img}
            alt="tournament"
            src={gameImg}
          />
        )}
        <Box className={`grid-stretch ${styles.title}`}>
          <Typography variant="h3" className="game-font text-upper">
            {tournament.Name}
          </Typography>
          <Box className={`grid-start ${styles.timing_box}`}>
            <Box className={`flex-start ${styles.timing}`}>
              <Box className="flex-start">
                <HourglassTopRounded fontSize="small" className={styles.icon} />
                <Typography variant="h5">Starts At</Typography>
                <Typography variant="h5" className={styles.time}>
                  {startTime}
                </Typography>
              </Box>
              <Box className="flex-center">
                <Typography className={styles.date} variant="h5">
                  {startDate}
                </Typography>
              </Box>
            </Box>
            <Box className={`flex-start ${styles.timing}`}>
              <Box className="flex-center">
                <HourglassEmptyRounded
                  fontSize="small"
                  className={styles.icon}
                />
                <Typography variant="h5">Join Ends At</Typography>
                <Typography variant="h5" className={styles.time}>
                  {joinEndTime}
                </Typography>
              </Box>
              <Box className="flex-center">
                <Typography className={styles.date} variant="h5">
                  {joinEndDate}
                </Typography>
              </Box>
            </Box>
            {finished && (
              <Box className={`flex-start ${styles.timing}`}>
                <Box className="flex-center">
                  <HourglassBottomRounded
                    fontSize="small"
                    className={styles.icon}
                  />
                  <Typography variant="h5">Finished At</Typography>
                  <Typography variant="h5" className={styles.time}>
                    {endTime}
                  </Typography>
                </Box>
                <Box className="flex-center">
                  <Typography className={styles.date} variant="h5">
                    {endDate}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Divider />
          <Box className={`flex-start ${styles.info}`}>
            <Box className={`grid-center text-center  ${styles.border}`}>
              <Typography variant="subtitle2" className="text-upper">
                Creator
              </Typography>
              <Link to={`/profile/${tournament.Creator}`}>
                <Typography
                  variant="h6"
                  className={`text-upper ${styles.data} ${styles.creator}`}
                >
                  {tournament.Creator}
                </Typography>
              </Link>
            </Box>
            <Box className={`grid-center text-center  ${styles.border}`}>
              <Typography variant="subtitle2" className="text-upper">
                Match Time
              </Typography>
              <Typography variant="h6" className={`text-upper ${styles.data}`}>
                {tournament.Time}
              </Typography>
            </Box>
            <Box className={`grid-center text-center  ${styles.border}`}>
              <Typography variant="subtitle2" className="text-upper">
                Match Type
              </Typography>
              <Typography variant="h6" className={`text-upper ${styles.data}`}>
                {tournament.Type}
              </Typography>
            </Box>
            <Box className={`grid-center text-center  ${styles.border}`}>
              <Typography variant="subtitle2" className="text-upper">
                Max Players
              </Typography>
              <Typography variant="h6" className={`text-upper ${styles.data}`}>
                {tournament.Max}
              </Typography>
            </Box>
            <Box className={`grid-center text-center  ${styles.border}`}>
              <Typography variant="subtitle2" className="text-upper">
                Enrolled
              </Typography>
              <Typography variant="h6" className={`text-upper ${styles.data}`}>
                {tournament.Players.length}
              </Typography>
            </Box>
            <IconButton
              onClick={handleCopyJoinLink}
              className={`grid-center text-center  ${styles.border}`}
            >
              <Typography variant="subtitle2" className="text-upper">
                Copy Join Link
              </Typography>
              <ContentCopyRounded />
            </IconButton>
          </Box>
        </Box>
        <Box className={`flex-stretch ${styles.btn}`}>
          {buttonType === "view" ? (
            <MyButton className="text-upper" onClick={handleView}>
              View Tournament
            </MyButton>
          ) : buttonType === "join" ? (
            <MyButton className="text-upper" onClick={handleJoin}>
              Join Tournament
            </MyButton>
          ) : (
            <MyButton className="text-upper" onClick={handleEnter}>
              Enter Tournament
            </MyButton>
          )}
        </Box>
      </Box>
      {(username === tournament.Creator || role === "Admin") && (
        <Box className={`flex-end`}>
          <IconButton
            onClick={handleDelete}
            className={`flex-center ${styles.delete_button}`}
          >
            <DeleteForeverRounded />
            <Typography variant="h6">Delete</Typography>
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default TournamentCard;
