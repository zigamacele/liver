import { Tooltip as Tip } from 'antd';
import React, { ReactComponentElement } from 'react';

export default function Tooltip({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) {
  return <Tip title={title}>{children}</Tip>;
}
