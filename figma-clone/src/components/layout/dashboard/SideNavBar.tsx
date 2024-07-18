import { useAuth } from "../../../contexts/AuthContext";
import { SideNavBarProp } from "../../../types/IDashBoardProp";
import { draftIcon,  notificationIcon, recentIcon, searchIcon } from "../../../utils";
import { logOut } from "../../../utils/logOut";
import { Input } from "../../common/ui/input";
import PlansBox from "../../common/ui/PlansBox";

export default function SideNavBar({ onRecentClick, onDraftClick, recActive, draftActive }: SideNavBarProp) {
    const { dispatch } = useAuth();

    const logoutHandler = async () => {
        try {
            await logOut();
            dispatch({ type: "LOGOUT" });
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="h-screen w-72 border-r-[0.5px] border-borderColor">
            <div className="p-3 pt-7 space-y-5">
                {/* User Profile */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[13px]">
                        <div className="bg-green-500 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm">
                            O
                        </div>
                        <p className="text-white text-[15px] font-medium">Osama Zaid</p>
                    </div>
                    <div className="cursor-pointer">
                        <img src={notificationIcon} alt="notification" width={20} />
                    </div>
                </div>

                {/* Search */}
                <div className="search">
                    <Input
                        icon={searchIcon}
                        placeholder="Search for anything"
                        className="bg-[#383838] pl-10  border-none h-9 pr-10 text-white !placeholder-[#6f6f6f]"
                    />
                </div>
            </div>

            {/* Router */}
            <div className="text-white space-y-2">
                <div
                    className={`flex gap-2 h-10 pl-3 items-center cursor-pointer  ${recActive ? 'bg-[#4A5878]' : 'hover:bg-[#c4cbdb17] transition-all duration-200'}`}
                    onClick={onRecentClick}
                >
                    <img src={recentIcon} alt="recentIcon" width={17} />
                    <p className="text-[15px]">Recent</p>
                </div>

                <div
                    className={`flex gap-2 h-10 pl-3 items-center cursor-pointer ${draftActive ? 'bg-[#4A5878]' : 'hover:bg-[#c4cbdb17] transition-all duration-200'}`}
                    onClick={onDraftClick}
                >
                    <img src={draftIcon} alt="draftIcon" width={17} />
                    <p className="text-[15px]">Draft</p>
                </div>
            </div>

            <div className="border-b-[0.5px] w-full border-borderColor"></div>

            <PlansBox />

            <div className="border-b-[0.5px] w-full border-borderColor"></div>

            <div className="flex-none mt-auto absolute bottom-0">
                <div className="text-white p-5 pb-2 cursor-pointer flex items-center  gap-4">
                    <span className="hover:opacity-20 transition-all duration-200 text-sm">Explore Community </span>
                </div>

                <div className="text-white p-5 pt-0 cursor-pointer flex items-center  gap-4">
                    <span  onClick={logoutHandler} className="hover:text-red-600 transition-all duration-200 text-sm">Log out</span>
                </div>

            </div>


        </div>
    );
}
