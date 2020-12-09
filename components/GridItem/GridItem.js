import React from "react";
import styled from "styled-components";

const StyledGridItem = styled.li`
  position: relative;
  cursor: pointer;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 4px;
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
