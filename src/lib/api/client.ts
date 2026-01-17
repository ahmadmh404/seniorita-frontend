import { strapi } from "@strapi/client";

/**
 * Backend API base URL
 */
const API_BASE_URL = process.env.API_URL!;

/**
 * Strapi API Client
 */
export const client = strapi({ baseURL: API_BASE_URL });
