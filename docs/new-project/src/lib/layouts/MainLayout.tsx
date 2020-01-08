import React from "react";

type Props = {
  children: React.ReactNode;
};

export function MainLayout(props: Props) {
  const { children } = props;
  return (
    <div>
      <nav></nav>
      <main>{children}</main>
    </div>
  );
}
