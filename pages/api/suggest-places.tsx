import type { NextApiRequest, NextApiResponse } from "next";

const suggestGoogle = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}&types=geocode`
  );
  const data = await response.json();

  return data.predictions.map((prediction: any) => prediction.description);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = String(req.query.address ?? "");

  const data = await suggestGoogle(address);
  return res.status(200).json(data);
}
