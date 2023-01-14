import Head from 'next/head';
import type { FC } from 'react';

const HeadComp: FC<{ headTitle?: string | undefined }> = ({
  headTitle = undefined,
}) => {
  // Head component to define meta tags
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
        <meta content='Private Chat Application' property='og:title' />
        <meta
          content='Easy way to chat with people.'
          property='og:description'
        />
        <meta
          content='https://private-chat-application.up.railway.app'
          property='og:url'
        />
        <meta content='' property='og:image' />
        <meta content='#448fef' data-react-helmet='true' name='theme-color' />
      </Head>
    </>
  );
};

export default HeadComp;
