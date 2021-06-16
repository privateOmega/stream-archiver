import { promisify } from 'util';
import { PassThrough, finished } from 'stream';
import merge from 'lodash.merge';
import PromisePool from '@supercharge/promise-pool';
import archiver from 'archiver';
import axios from 'axios';

const promisifiedFinished = promisify(finished);

class StreamArchiver {
  constructor(
    format = 'zip',
    archiverOptions = {},
    concurrency = 2,
    streams = [],
    files = [],
    debug = false
  ) {
    this.archive = archiver(
      format,
      merge(
        {
          store: true,
        },
        archiverOptions
      )
    );
    this.concurrency = concurrency;
    this.defaultStream = new PassThrough();
    this.streams = streams.length ? streams : [this.defaultStream];
    this.files = files;
    this.debug = debug;
  }

  async process() {
    const self = this;
    const { archive, concurrency, streams, files, debug } = self;

    function handleError() {
      archive.abort();
      archive.destroy();
      streams.destroy.forEach(({ stream }) => stream.destroy());
    }

    streams.forEach(({ stream, selfDestroy = false }) => {
      function selfDestroyStream() {
        stream.destroy();
      }

      archive
        .on('error', handleError)
        .pipe(stream)
        .on('error', selfDestroy ? selfDestroyStream : handleError);
    });

    await PromisePool.withConcurrency(concurrency)
      .for(files)
      .handleError((error) => {
        if (error) {
          throw error;
        }
      })
      .process(async ({ fileNameWithExt, url }) => {
        debug && console.debug(`Processing ${fileNameWithExt}`);

        const response = await axios({
          method: 'get',
          url: url,
          responseType: 'stream',
        });

        archive.append(response.data, { name: fileNameWithExt });

        await promisifiedFinished(response.data);
      })
      .catch((error) => {
        debug && console.error(`Error [Stream Archiver]: ${error}`);

        handleError();

        throw error;
      });

    archive.finalize();
  }
}

export default StreamArchiver;
