import { createWriteStream } from 'fs';
import { join } from 'path';

import StreamArchiver from '../src';

const zipStream = createWriteStream(join(__dirname, './example.zip'));

const files = [
  {
    fileNameWithExt: '1.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/ttfm.dcm',
  },
  {
    fileNameWithExt: '2.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/bmode.dcm',
  },
  {
    fileNameWithExt: '3.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/bmode_privatetags.dcm',
  },
  {
    fileNameWithExt: '4.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/ttfm.dcm',
  },
  {
    fileNameWithExt: '5.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/bmode.dcm',
  },
  {
    fileNameWithExt: '6.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/bmode_privatetags.dcm',
  },
  {
    fileNameWithExt: '7.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/ttfm.dcm',
  },
  {
    fileNameWithExt: '8.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/bmode.dcm',
  },
  {
    fileNameWithExt: '9.dcm',
    url: 'http://medistim.com/wp-content/uploads/2016/07/bmode_privatetags.dcm',
  },
];

const streamArchiver = new StreamArchiver(
  'zip',
  undefined,
  4,
  [{ stream: zipStream }],
  files,
  true
);

(async () => {
    await streamArchiver.process();

    console.log('\nGenerated an archive');
})();

