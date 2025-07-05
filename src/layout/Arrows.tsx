import "./Arrows.scss";
import { ReactNode } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type ArrowProps = {
  children: ReactNode;
  onHandleSlide: (action: string) => void;
  offset: number;
  maxOffset: number;
};

export default function Arrows({
  children,
  onHandleSlide,
  offset,
  maxOffset,
}: ArrowProps) {
  return (
    <>
      <button
        onClick={() => onHandleSlide("previous")}
        className={`arrows ${offset === 0 ? "disabled-button" : ""}`}
        disabled={offset === 0}
      >
        <ArrowForwardIosIcon className="arrow-left" />
      </button>
      {children}
      <button
        onClick={() => onHandleSlide("next")}
        className={`arrows ${offset === maxOffset ? "disabled-button" : ""}`}
        disabled={offset === maxOffset}
      >
        <ArrowForwardIosIcon className="arrow-right" />
      </button>
    </>
  );
}
