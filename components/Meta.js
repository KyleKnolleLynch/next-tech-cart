import Head from 'next/head'

const Meta = ({ title, desc, keywords, robots, robotsContent }) => {
  return (
    <Head>
      <meta name='description' content={desc} />
      <meta name='keywords' content={keywords} />
      <meta name={robots} content={robotsContent} />
      <link rel='icon' href='/logo.ico' />

      <title>{title}</title>
    </Head>
  )
}

export default Meta
