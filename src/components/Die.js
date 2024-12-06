import React from "react";

export default function Die(prop) {
  const styles = {
    backgroundColor: prop.isHeld ? "#59E391" : "#fff"
  }
  return (
    <span
      className="die"
      style={styles}
      onClick={prop.handleClick}
    >{prop.value}</span>
  )
}