import React from 'react'
import './../Styles/Button.css'
const STYLES = ['btn--primary', 'btn--secondary', 'btn--test']
export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0]
  return (
    <button
      className={`${checkButtonStyle}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
