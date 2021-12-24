import { resolve } from "https://deno.land/std@0.117.0/path/mod.ts";
import { Result } from "../main.ts";
import { getDayCountFlashingOctopuses } from "./getFlashingDumboOctopuses.ts";

const file = resolve("day11", "input", "dumbos.txt");

async function getFile(): Promise<number[][]> {
  const fileText = await Deno.readTextFile(file);
  return fileText.split(/\n/).map((string) =>
    string.split("").map((stringNumber) => parseInt(stringNumber))
  );
}

export async function getDayElevenResults(): Promise<Result> {
  const dumboOctopuses = await getFile();
  const exerciseOne = getDayCountFlashingOctopuses(dumboOctopuses, 100);

  return { exerciseOne };
}
