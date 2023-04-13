import Head from 'next/head'

type TitleProps = {
  title: string;
}

export default function SuperHead({title}: TitleProps) {
  return (
    <Head>
      <title>{title ? title + "- shop" : "e-commerce corp"}</title>
      <meta name="description" content="e-commerce website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
