"use server";

import { cacheTag } from "next/cache";
import { client } from "./client";
import {
  getOfferCacheTag,
  getOfferTitleCacheTag,
  getPaginatedFeature,
} from "../data-cache";
import { DataPage, Offer } from "../types";

const offers = client.collection("offers");

/**
 * Get Offers
 * @param start
 * @returns offers with pagination
 */
export async function getOffers(
  start?: number,
  page?: number
): Promise<DataPage<Offer>> {
  "use cache";
  cacheTag(getPaginatedFeature("offers", page));

  const response = await offers.find({
    sort: "createdAt:desc",
    populate: "image",
    pagination: { start },
  });

  return {
    data: response.data as Offer[],
    pagination: response.meta.pagination ?? null,
  } as DataPage<Offer>;
}

/**
 * get single offer
 * @param slug
 * @returns offer or null
 */
export async function getOffer(slug: string) {
  "use cache";
  cacheTag(getOfferCacheTag(slug));

  const response = await offers.findOne(slug);
  return { offer: response.data as Offer | null };
}

export async function getOfferByTitle(title: string) {
  "use cache";
  cacheTag(getOfferTitleCacheTag(title));

  const response = await offers.find({ filters: { title: title.trim() } });
  return { offer: response.data.at(0) as Offer | null };
}
