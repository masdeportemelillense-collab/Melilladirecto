import { createServerFn } from "@tanstack/react-start";
import { buildBoard } from "./board";
import type { Board } from "./types";

export const getBoard = createServerFn({ method: "GET" }).handler(
  async (): Promise<Board> => {
    const { fetchRemoteMatches } = await import("./remote");
    const overlay = await fetchRemoteMatches();
    return buildBoard(Date.now(), overlay);
  },
);
