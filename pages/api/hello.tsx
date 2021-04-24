// https://nextjs.org/docs/basic-features/typescript

import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
};

// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   res.status(200).json({ name: 'John Doe' })
// }
