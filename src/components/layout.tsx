import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h2>outlet</h2>
      <Outlet />
    </>
  );
}
