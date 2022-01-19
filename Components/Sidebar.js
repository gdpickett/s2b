import { ChevronDownIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/outline";
import { CalendarIcon, ClockIcon, DesktopComputerIcon, UsersIcon } from '@heroicons/react/solid'
import { connect, useStore } from "react-redux";
import SidebarRow from "./SidebarRow";

function Sidebar() {
    //const { data: session, loading} = useSession();
    //if(!session) return <div></div>;
    //const picture = JSON.parse(JSON.stringify(name))
    const store = useStore()
    const state = store.getState()
    //console.log('sidebar state'+state)
    //console.log('sidebar session'+session)//works
    //console.log('sidebar url'+JSON.stringify(url))
    //console.log('sidebar name'+name)
    const url = state.addUser.users[0].picture.data.url
    const name = state.addUser.users[0].name
    //srcPic = picture.data.url;
    //console.log('sidebar session'+JSON.parse(JSON.stringify(name)))
    if (name) {
        return (
            <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300]">
                <SidebarRow src={url} title={name} />
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

export default connect(state => state)(Sidebar)