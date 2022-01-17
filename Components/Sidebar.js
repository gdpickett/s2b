import { ChevronDownIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/outline";
import { CalendarIcon, ClockIcon, DesktopComputerIcon, UsersIcon } from '@heroicons/react/solid'
import SidebarRow from "./SidebarRow";

function Sidebar({ session }) {
    //const { data: session, loading} = useSession();
    //if(!session) return <div></div>;
    if (session) {
        return (
            <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300]">
                <SidebarRow src={session.user.image} title={session.user.name} />
                <SidebarRow Icon={UsersIcon} title='Friends' />
                <SidebarRow Icon={UserGroupIcon} title='Groups' />
                <SidebarRow Icon={ShoppingBagIcon} title='Marketplace' />
                <SidebarRow Icon={DesktopComputerIcon} title='Watch' />
                <SidebarRow Icon={CalendarIcon} title='Events' />
                <SidebarRow Icon={ClockIcon} title='Memories' />
                <SidebarRow Icon={ChevronDownIcon} title='See More' />
            </div>
        )
    } else {
        return (
            <div>No Sidebar</div>
        )
    }
}

export default Sidebar