import { Desktop, Mobile } from "../responsive/Responsive";
import RootLayoutMobile from "./RootLayoutMobile";
import Sidebar from "./sidebar";

function RootLayout({ children }) {
  return (
    <div className="">
      <Desktop>
      <div className="flex gap-5">
      <Sidebar />
      <main className="max-w-5xl flex-1 mx-auto py-4">{children}</main>
    </div>
    </Desktop>
    <Mobile>
      <RootLayoutMobile />
    </Mobile>
    </div>
  );
}

export default RootLayout;
