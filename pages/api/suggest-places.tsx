import type { NextApiRequest, NextApiResponse } from "next";

const suggestGoogle = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}&types=geocode`
  );
  const data = await response.json();

  return data.predictions.map((prediction: any) => prediction.description);
};

const suggestMapbox = async (address: string) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}&bbox=12.09,48.55,18.87,51.06`
  );
  const data = await response.json();

  return data.features.map((feature: any) => feature.place_name);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = req.query.type ?? "google";
  const address = String(req.query.address ?? "");

  if (type === "google") {
    const data = await suggestGoogle(address);
    return res.status(200).json(data);
  } else if (type === "mapbox") {
    const data = await suggestMapbox(address);
    return res.status(200).json(data);
  } else {
    return res.status(400).json({ message: "Invalid type" });
  }
}
