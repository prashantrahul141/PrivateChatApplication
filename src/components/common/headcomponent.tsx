import Head from 'next/head';
import type { FC } from 'react';

const HeadComp: FC<{ headTitle?: string | undefined }> = ({
  headTitle = undefined,
}) => {
  return (
    <>
      <Head>
        {headTitle === undefined && <title>{`PCA`}</title>}
        {headTitle !== undefined && <title>{`PCA | ${headTitle}`}</title>}
        <meta
          name='description'
          charSet='UTF-8'
          content='Private Chat Application'
        />
        {/* <link rel='manifest' href='/manifest.json'></link> */}
        <meta name='darkreader-lock' />
      </Head>
    </>
  );
};

export default HeadComp;
