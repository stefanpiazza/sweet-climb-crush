import React from "react";
import styled from "styled-components";

const StyledGridItem = styled.li`
  position: relative;
  cursor: pointer;
  margin: 8px;

  &:before {
    content: "";
    padding-top: 100%;
    display: block;
  }
`;

const GridItem = ({ className, children, onClick, onMouseEnter }) => (
  <StyledGridItem
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    className={className}
  >
    {children}
  </StyledGridItem>
);

export default GridItem;
