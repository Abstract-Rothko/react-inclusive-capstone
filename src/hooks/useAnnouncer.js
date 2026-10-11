import { useContext } from "react";
import { AnnouncerContext } from "../context/AnnouncerContext";

export const useAnnouncer = () => useContext(AnnouncerContext);