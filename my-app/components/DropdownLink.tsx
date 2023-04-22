import Link from 'next/link'
import React, { ReactNode } from 'react'

type DropProps = {
  href: string;
  children: React.ReactNode;
}

export default function DropdownLink(props: DropProps) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <p {...rest}>{children}</p>
    </Link>
  )
}