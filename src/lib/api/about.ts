"use server";

import { client } from "@/lib/api/client";
import { cacheTag } from "next/cache";
import { getAboutPageFeaturesTag } from "../data-cache";

// about page queries file

export async function getAboutFeatures() {
  "use cache";
  cacheTag(getAboutPageFeaturesTag());

  const response = await client.single("about-feature").find();
  return { features: response.data };
}
