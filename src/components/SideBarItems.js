import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import StarIcon from "@material-ui/icons/Star";
import HomeIcon from "@material-ui/icons/Home";

export default function SideBarItems({ setRecommendedView }) {
  return (
    <div>
      <ListItem button onClick={() => setRecommendedView(false)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => setRecommendedView(true)}>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Recommended" />
      </ListItem>
      <ListItem button disabled>
        <ListItemIcon>
          <CompareArrowsIcon />
        </ListItemIcon>
        <ListItemText primary="Compare saves" />
      </ListItem>
    </div>
  );
}
